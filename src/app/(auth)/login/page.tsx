import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập | MeowMarket",
  description: "Đăng nhập user hoặc admin với validation."
};

export default function LoginRoute({
  searchParams
}: {
  searchParams: { role?: "USER" | "ADMIN" };
}) {
  return <LoginForm role={searchParams.role === "ADMIN" ? "ADMIN" : "USER"} />;
}
