import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";
import { createBackendClient } from "@/lib/backend-client";
import { getServerEnv } from "@/lib/env";
import { isTokenExpired } from "@/lib/jwt";
import { unauthorizedSessionResponse } from "@/lib/session-response";

const actions = {
  getUsdtBalance: { method: "POST", path: "/Self/USDTBalance" },
  getVeltBalance: { method: "POST", path: "/Self/VELTTBalance" },
  getSelfDepositHistory: {
    method: "POST",
    path: "/Self/getSelfDepsiteDetailsByURID",
  },
  requestUsdtDeposit: { method: "POST", path: "/Self/SendUSDTDepositRequest" },
  requestVeltDeposit: {
    method: "POST",
    path: "/Self/SendVELTTokenDepositRequest",
  },
  getWalletReport: {
    method: "GET",
    path: "/FundManager/getTransferIncomeToDepositWalletReport",
  },
  getWithdrawalStatement: {
    method: "GET",
    path: "/FundManager/getUserIncomeWalletStatement",
  },
  sendIncomeTransferOtp: {
    method: "POST",
    path: "/SMTPServices/sendOtpIncomeToDepositWallet",
  },
  transferIncome: {
    method: "POST",
    path: "/FundManager/addTransferIncomeToDepositWallet",
    secret: "FUND_DIRECTOR_INCOME_AUTH_CODE",
    secretField: "authenticationCode",
  },
  lookupRecipient: {
    method: "GET",
    path: "/AdminMaster/userNameByLoginId",
    query: "authLogin",
  },
  getP2pHistory: {
    method: "GET",
    path: "/FundManager/getfundTransferDepositToDepositReport",
    query: "URID",
  },
  sendP2pOtp: {
    method: "POST",
    path: "/SMTPServices/sendOtpptwoptrasferEmail",
  },
  transferP2p: {
    method: "POST",
    path: "/FundManager/fundTransferDepositToDeposit",
    secret: "FUND_DIRECTOR_P2P_AUTH_CODE",
    secretField: "authenticationCode",
  },
  sendWithdrawalOtp: {
    method: "POST",
    path: "/SMTPServices/sendOtpwithdrawalEmail",
  },
  requestWithdrawal: {
    method: "POST",
    path: "/FundManager/addUserWithdrawalRequest",
    secret: "FUND_DIRECTOR_WITHDRAWAL_SECURE_CODE",
    secretField: "secureCode",
  },
} as const;

type ActionName = keyof typeof actions;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isActionName(value: string): value is ActionName {
  return Object.hasOwn(actions, value);
}

async function proxyAction(request: NextRequest, actionName: string, method: "GET" | "POST") {
  const { SESSION_COOKIE_NAME, ...serverEnv } = getServerEnv();
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return unauthorizedSessionResponse(SESSION_COOKIE_NAME, "Not authenticated");
  }

  if (!isActionName(actionName)) {
    return NextResponse.json(
      { success: false, message: "Unknown Fund Director action." },
      { status: 404 },
    );
  }

  const action = actions[actionName];
  if (action.method !== method) {
    return NextResponse.json(
      { success: false, message: "Unsupported method for this action." },
      { status: 405 },
    );
  }

  try {
    const session = JSON.parse(decodeURIComponent(sessionCookie));
    const token = session.accessToken;
    if (typeof token !== "string" || !token || isTokenExpired(token)) {
      return unauthorizedSessionResponse(
        SESSION_COOKIE_NAME,
        "Session expired or invalid. Please login again.",
      );
    }

    const backend = createBackendClient(token);
    let endpoint: string = action.path;
    if ("query" in action) {
      let queryValue = request.nextUrl.searchParams.get(action.query) ?? "";
      if (actionName === "getP2pHistory" && !queryValue) {
        const { data: profileResponse } = await backend.get("/Authentication/getProfileDetails");
        const profileData = isRecord(profileResponse) ? profileResponse.data : null;
        const profile = Array.isArray(profileData) ? profileData[0] : null;
        const urid = isRecord(profile) ? (profile.URID ?? profile.urid) : undefined;
        if (typeof urid !== "string" && typeof urid !== "number") {
          return NextResponse.json(
            { success: false, message: "Your user ID is unavailable." },
            { status: 422 },
          );
        }
        queryValue = String(urid);
      }
      endpoint = `${action.path}?${action.query}=${encodeURIComponent(queryValue)}`;
    }

    if (method === "GET") {
      const { data } = await backend.get(endpoint);
      return NextResponse.json(data);
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      payload = {};
    }

    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
      return NextResponse.json(
        { success: false, message: "Request body must be a JSON object." },
        { status: 400 },
      );
    }

    const body: Record<string, unknown> = { ...payload };
    if (actionName === "requestWithdrawal") {
      const amount = Number(body.amount);
      const walletAdress = body.walletAdress;
      const payMode = Number(body.payMode);
      const walletType = Number(body.walletType);
      const withdrawalotp = body.withdrawalotp;

      if (
        !Number.isFinite(amount) ||
        amount <= 0 ||
        typeof walletAdress !== "string" ||
        !walletAdress.trim() ||
        !Number.isInteger(payMode) ||
        !Number.isInteger(walletType) ||
        typeof withdrawalotp !== "string" ||
        !/^\d{6}$/.test(withdrawalotp)
      ) {
        return NextResponse.json(
          { success: false, message: "Withdrawal request details are invalid." },
          { status: 400 },
        );
      }

      const secureCode = serverEnv.FUND_DIRECTOR_WITHDRAWAL_SECURE_CODE;
      if (!secureCode) {
        return NextResponse.json(
          {
            success: false,
            message: "Server configuration is missing FUND_DIRECTOR_WITHDRAWAL_SECURE_CODE.",
          },
          { status: 503 },
        );
      }

      const { data: profileResponse } = await backend.get("/Authentication/getProfileDetails");
      const profileData = isRecord(profileResponse) ? profileResponse.data : null;
      const profile = Array.isArray(profileData) ? profileData[0] : null;
      const emailid = isRecord(profile) ? (profile.Email ?? profile.email) : undefined;
      if (typeof emailid !== "string" || !emailid) {
        return NextResponse.json(
          {
            success: false,
            message: "Your profile email is unavailable. Update your profile and try again.",
          },
          { status: 422 },
        );
      }

      const withdrawalBody = {
        secureCode,
        ipAddress:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          request.headers.get("x-real-ip") ??
          "",
        amount,
        emailid,
        walletAdress: walletAdress.trim(),
        payMode,
        walletType,
        withdrawalotp,
      };
      const { data } = await backend.post(action.path, withdrawalBody);
      return NextResponse.json(data);
    }

    if (actionName === "transferP2p") {
      const { data: profileResponse } = await backend.get("/Authentication/getProfileDetails");
      const profileData = isRecord(profileResponse) ? profileResponse.data : null;
      const profile = Array.isArray(profileData) ? profileData[0] : null;
      const email = isRecord(profile) ? (profile.Email ?? profile.email) : undefined;
      if (typeof email !== "string" || !email) {
        return NextResponse.json(
          {
            success: false,
            message: "Your profile email is unavailable. Update your profile and try again.",
          },
          { status: 422 },
        );
      }
      body.email = email;
    }

    if ("secret" in action) {
      const secret = serverEnv[action.secret];
      if (!secret) {
        return NextResponse.json(
          {
            success: false,
            message: `Server configuration is missing ${action.secret}.`,
          },
          { status: 503 },
        );
      }
      body[action.secretField] = secret;
    }

    const { data } = await backend.post(action.path, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Fund Director action failed (${actionName}):`, error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return unauthorizedSessionResponse(
          SESSION_COOKIE_NAME,
          "Session expired or invalid. Please login again.",
        );
      }
      if (error.response) {
        return NextResponse.json(error.response.data, {
          status: error.response.status,
        });
      }
    }

    return NextResponse.json(
      { success: false, message: "Fund Director request failed." },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ action: string }> }) {
  const { action } = await context.params;
  return proxyAction(request, action, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ action: string }> }) {
  const { action } = await context.params;
  return proxyAction(request, action, "POST");
}
