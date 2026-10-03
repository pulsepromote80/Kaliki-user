import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createBackendClient } from "@/lib/backend-client";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { SESSION_COOKIE_NAME } = getServerEnv();
  const body = await request.json().catch(() => null);

  if (!body?.userid || !body?.password) {
    return NextResponse.json(
      { success: false, message: "userid and password are required" },
      { status: 400 },
    );
  }

  try {
    const backend = createBackendClient();
    const backendResponse = await backend.post("/Authentication/appLogin", {
      userid: body.userid,
      password: body.password,
      loginOTP: body.loginOTP,
    });

    const { accessToken, statusCode, message } = backendResponse.data;

    const response = NextResponse.json({
      statusCode,
      message,
      accessToken,

    });

    // Store both token and userData in the cookie
    const sessionData = JSON.stringify({
      accessToken,

    });

    response.cookies.set(SESSION_COOKIE_NAME, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Authentication failed";
      // Suppress the specific 401 error message about incorrect credentials
      if (errorMessage === "Details are incorrect, please enter correct credentials.") {
        return NextResponse.json(
          { success: false, message: "Invalid userid or password" },
          { status: 401 },
        );
      }
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: error.response?.status || 401 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 },
    );
  }
}
