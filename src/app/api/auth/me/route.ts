import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createBackendClient } from "@/lib/backend-client";
import { isTokenExpired } from "@/lib/jwt";
import axios from "axios";

/**
 * GET /api/auth/me
 * Reads the session cookie and validates it against the
 * .NET backend to return the current user's profile.
 */
export async function GET(request: NextRequest) {
  const { SESSION_COOKIE_NAME } = getServerEnv();
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Decode URL-encoded cookie value
    const decodedCookie = decodeURIComponent(sessionCookie);
    const sessionData = JSON.parse(decodedCookie);
    const token = sessionData.accessToken;

    if (!token) {
      return NextResponse.json({ success: false, message: "No token in session" }, { status: 401 });
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      return NextResponse.json(
        { success: false, message: "Token expired. Please login again." },
        { status: 401 }
      );
    }

    // Return user data from session if available
    if (sessionData.userData) {
      return NextResponse.json({
        success: true,
        data: sessionData.userData,
      });
    }

    // Fallback: fetch from backend if userData not in session
    const backend = createBackendClient(token);
    const { data } = await backend.get("/Authentication/me");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Auth me error:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json(
          { success: false, message: "Session expired or invalid. Please login again." },
          { status: 401 },
        );
      }
    }
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
