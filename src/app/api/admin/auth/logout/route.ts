import { NextRequest, NextResponse } from "next/server";
import { deleteCurrentSession } from "@/lib/server/auth";
import { apiError, isSameOrigin } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    await deleteCurrentSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "Sign-out is temporarily unavailable.");
  }
}

