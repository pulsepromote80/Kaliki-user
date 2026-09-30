import { NextResponse, type NextRequest } from "next/server";
import { createBackendClient } from "@/lib/backend-client";


export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.userid || !body?.password) {
    return NextResponse.json(
      { success: false, message: "userid and password are required" },
      { status: 400 },
    );
  }

  try {
    const backend = createBackendClient();
    const { data } = await backend.post("/SMTP/sendOtpLoginEmail", body);

    return NextResponse.json(data);
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 },
    );
  }
}
