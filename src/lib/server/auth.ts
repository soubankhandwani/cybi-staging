import "server-only";

import { MongoServerError, ObjectId } from "mongodb";
import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getDb } from "@/lib/server/mongodb";
import { normalizeEmail, randomToken, sha256 } from "@/lib/server/security";

export const SESSION_COOKIE = "cyberi_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type AdminIdentity = { id: string; email: string; name: string };

export type AdminRecord = {
  _id: ObjectId;
  email: string;
  name: string;
  passwordHash: string;
  passwordVersion: number;
  resetCode?: { otpHash: string; attempts: number; expiresAt: Date; issuedAt: Date };
};

const PASSWORD_PREFIX = "sha256:";

export async function hashPassword(password: string) {
  return PASSWORD_PREFIX + await hash(sha256(password), 12);
}

// Keep verification time comparable when the administrator email doesn't match.
const DUMMY_HASH = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxFJjyn4WvYJWHQ5RK3uN1v0lS2";

export async function ensureConfiguredAdmin() {
  const email = normalizeEmail(process.env.ADMIN_EMAIL || "");
  const password = process.env.ADMIN_INITIAL_PASSWORD || "";
  if (!email) return null;

  const db = await getDb();
  const admins = db.collection<AdminRecord>("admins");
  const admin = await admins.findOne({ email });
  if (admin || !password) return admin;
  if (password.length < 12 || password.length > 128 || password === "replace-with-a-long-random-password") {
    throw new Error("ADMIN_INITIAL_PASSWORD must be a unique password of 12–128 characters.");
  }
  const now = new Date();
  const passwordHash = await hashPassword(password);
  try {
    await admins.updateOne(
      { email },
      { $setOnInsert: { email, name: process.env.ADMIN_NAME?.trim() || "Site Administrator", passwordHash, passwordVersion: 1, createdAt: now, updatedAt: now } },
      { upsert: true },
    );
  } catch (error) {
    if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
  }
  return admins.findOne({ email });
}

export async function verifyCredentials(email: string, password: string) {
  const configured = await ensureConfiguredAdmin();
  const admin = configured?.email === email ? configured : null;
  const stored = admin?.passwordHash ?? DUMMY_HASH;
  const matches = stored.startsWith(PASSWORD_PREFIX)
    ? await compare(sha256(password), stored.slice(PASSWORD_PREFIX.length))
    : await compare(password, stored);
  return matches ? admin : null;
}

export async function createSession(admin: AdminRecord, metadata?: { ip?: string; userAgent?: string }) {
  const token = randomToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const db = await getDb();
  await db.collection("sessions").insertOne({
    tokenHash: sha256(token), adminId: admin._id, passwordVersion: admin.passwordVersion,
    createdAt: new Date(), expiresAt, ...metadata,
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export const getCurrentAdmin = cache(async (): Promise<AdminIdentity | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await getDb();
  const session = await db.collection<{ adminId: ObjectId; passwordVersion: number; expiresAt: Date }>("sessions").findOne({
    tokenHash: sha256(token), expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  const email = normalizeEmail(process.env.ADMIN_EMAIL || "");
  const admin = await db.collection<AdminRecord>("admins").findOne({ _id: session.adminId, email, passwordVersion: session.passwordVersion });
  return admin ? { id: admin._id.toHexString(), email: admin.email, name: admin.name } : null;
});

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function deleteCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.collection("sessions").deleteOne({ tokenHash: sha256(token) });
  }
  cookieStore.delete(SESSION_COOKIE);
}


