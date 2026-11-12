import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { MongoServerError } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/server/mongodb";

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function requestIp(request: NextRequest) {
  const header = process.env.TRUSTED_CLIENT_IP_HEADER?.trim();
  const ip = header ? request.headers.get(header)?.trim() : undefined;
  return ip && isIP(ip) ? ip : "unknown";
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const expected = configured ? new URL(configured).origin : request.nextUrl.origin;
    return origin === expected;
  } catch {
    return false;
  }
}

export async function enforceRateLimit(scope: string, key: string, limit: number, windowMs: number) {
  const db = await getDb();
  const start = Math.floor(Date.now() / windowMs) * windowMs;
  const collection = db.collection<{ _id: string; count: number; expiresAt: Date }>("rateLimits");
  const _id = `${scope}:${key}:${start}`;
  const filter = { _id, count: { $lt: limit } };
  try {
    await collection.updateOne(filter, {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date(start + windowMs) },
    }, { upsert: true });
    return true;
  } catch (error) {
    if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
    // Another request created this counter, or the limit has already been reached.
    return (await collection.updateOne(filter, { $inc: { count: 1 } })).modifiedCount === 1;
  }
}

export class RequestBodyError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function readBody(request: Request, maxBytes: number) {
  if (Number(request.headers.get("content-length")) > maxBytes) {
    throw new RequestBodyError(413, "The request is too large.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestBodyError(400, "A request body is required.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        void reader.cancel().catch(() => {});
        throw new RequestBodyError(413, "The request is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks, size);
}

export async function readJson(request: Request, maxBytes = 4096): Promise<Record<string, unknown>> {
  const body = await readBody(request, maxBytes);
  try {
    const value = JSON.parse(body.toString("utf8"));
    if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch {
    throw new RequestBodyError(400, "Send a valid JSON object.");
  }
}

export function apiError(error: unknown, message: string, status = 503) {
  if (error instanceof RequestBodyError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error(message, error instanceof Error ? error.name : "Unknown error");
  return NextResponse.json({ error: message }, { status });
}

