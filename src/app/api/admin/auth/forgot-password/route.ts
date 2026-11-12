import { randomInt } from "node:crypto";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ensureConfiguredAdmin, type AdminRecord } from "@/lib/server/auth";
import { sendMail } from "@/lib/server/mail";
import { getDb } from "@/lib/server/mongodb";
import { apiError, enforceRateLimit, isSameOrigin, normalizeEmail, readJson, requestIp, sha256 } from "@/lib/server/security";
import { emailSchema } from "@/lib/server/validation";

const genericMessage = "If that email belongs to the administrator, a reset code has been sent.";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    const { email: inputEmail } = await readJson(request);
    const parsed = emailSchema.safeParse(inputEmail);
    if (!parsed.success) return NextResponse.json({ message: genericMessage });
    const email = normalizeEmail(parsed.data);
    const ip = requestIp(request);
    if (!(await enforceRateLimit("forgot-ip", sha256(ip), 5, 30 * 60_000))) return NextResponse.json({ message: genericMessage });
    if (!(await enforceRateLimit("forgot-account", sha256(email), 3, 30 * 60_000))) return NextResponse.json({ message: genericMessage });

    const admin = await ensureConfiguredAdmin();
    if (admin?.email !== email) return NextResponse.json({ message: genericMessage });
    const db = await getDb();
    const admins = db.collection<AdminRecord>("admins");
    const otp = String(randomInt(100_000, 1_000_000));
    const otpHash = await hash(otp, 12);
    const now = new Date();
    const result = await admins.updateOne({
      _id: admin._id,
      passwordVersion: admin.passwordVersion,
      $or: [{ resetCode: { $exists: false } }, { "resetCode.issuedAt": { $lte: new Date(now.getTime() - 60_000) } }],
    }, { $set: { resetCode: { otpHash, attempts: 0, issuedAt: now, expiresAt: new Date(now.getTime() + 10 * 60_000) } } });
    if (result.modifiedCount) {
      try {
        await sendMail({
          to: email,
          subject: "Your Cyber-I publishing password reset code",
          text: "Your password reset code is " + otp + ". It expires in 10 minutes. If you did not request this, ignore this email.",
        });
      } catch (error) {
        await admins.updateOne({ _id: admin._id, "resetCode.otpHash": otpHash }, { $unset: { resetCode: "" } });
        throw error;
      }
    }
    return NextResponse.json({ message: genericMessage });
  } catch (error) {
    return apiError(error, "Password recovery is temporarily unavailable.");
  }
}