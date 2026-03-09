import { NextResponse } from "next/server";
import { authenticateCredentials } from "@/services/auth/credentials-auth-service";
import { createUserSession } from "@/services/user-service";

export async function POST(request: Request) {
  const body = await request.json();

  const user = await authenticateCredentials(
    body.email as string,
    body.password as string
  );

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Email hoặc mật khẩu chưa đúng." },
      { status: 401 }
    );
  }

  const session = await createUserSession(user.id);

  return NextResponse.json({
    success: true,
    user,
    session: {
      token: session.token,
      role: user.role,
      expiresAt: session.expiresAt
    }
  });
}
