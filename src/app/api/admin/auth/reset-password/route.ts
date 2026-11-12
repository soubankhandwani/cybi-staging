import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, type AdminRecord } from "@/lib/server/auth";
import { getDb } from "@/lib/server/mongodb";
import { apiError, enforceRateLimit, isSameOrigin, normalizeEmail, readJson, requestIp, sha256 } from "@/lib/server/security";
import { emailSchema, passwordSchema } from "@/lib/server/validation";

const invalidCode = () => NextResponse.json({ error: "This code is invalid or has expired." }, { status: 400 });

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    const body = await readJson(request);
    const emailResult = emailSchema.safeParse(body.email);
    const passwordResult = passwordSchema.safeParse(body.password);
    const otp = typeof body.otp === "string" ? body.otp.trim() : "";
    if (!emailResult.success || !passwordResult.success || !/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: passwordResult.error?.issues[0]?.message || "Enter a valid email and six-digit code." }, { status: 400 });
    }
    const ip = requestIp(request);
    if (!(await enforceRateLimit("reset-ip", sha256(ip), 10, 30 * 60_000))) {
      return NextResponse.json({ error: "Too many attempts. Please wait 30 minutes." }, { status: 429 });
    }
    const email = normalizeEmail(emailResult.data);
    if (email !== normalizeEmail(process.env.ADMIN_EMAIL || "")) return invalidCode();
    const db = await getDb();
    const admins = db.collection<AdminRecord>("admins");
    const admin = await admins.findOneAndUpdate({
      email,
      "resetCode.expiresAt": { $gt: new Date() },
      "resetCode.attempts": { $lt: 5 },
    }, { $inc: { "resetCode.attempts": 1 } }, { returnDocument: "after" });
    if (!admin?.resetCode || !(await compare(otp, admin.resetCode.otpHash))) return invalidCode();
    const passwordHash = await hashPassword(passwordResult.data);
    const now = new Date();
    // Consume the code and revoke every previous session in the same atomic write.
    const result = await admins.updateOne({
      _id: admin._id,
      "resetCode.otpHash": admin.resetCode.otpHash,
      "resetCode.expiresAt": { $gt: now },
    }, {
      $set: { passwordHash, updatedAt: now },
      $inc: { passwordVersion: 1 },
      $unset: { resetCode: "" },
    });
    return result.modifiedCount ? NextResponse.json({ ok: true }) : invalidCode();
  } catch (error) {
    return apiError(error, "Password recovery is temporarily unavailable.");
  }
}