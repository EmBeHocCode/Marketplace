"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators";
import type { LoginFormValues } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LoginForm({ role = "USER" }: { role?: "USER" | "ADMIN" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? (role === "ADMIN" ? "/admin" : "/profile");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: role === "ADMIN" ? "admin@meowmarket.vn" : "user@meowmarket.vn",
      password: "123456",
      role
    }
  });

  const currentRole = watch("role");

  const onSubmit = async (values: LoginFormValues) => {
    document.cookie = `meowmarket-session=${values.email}; path=/`;
    document.cookie = `meowmarket-role=${values.role}; path=/`;
    setServerMessage("Đăng nhập mock thành công. Đang chuyển hướng...");
    window.location.href = redirect;
  };

  return (
    <Card className="w-full max-w-lg">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-ink">Đăng nhập MeowMarket</h1>
        <p className="text-sm leading-7 text-muted">
          Demo user: `user@meowmarket.vn` hoặc admin: `admin@meowmarket.vn`.
        </p>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <select
          {...register("role")}
          className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
        >
          <option value="USER">Khách hàng</option>
          <option value="ADMIN">Quản trị viên</option>
        </select>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
        />
        {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : null}
        <input
          type="password"
          {...register("password")}
          placeholder="Mật khẩu"
          className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
        />
        {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : null}
        <Button type="submit" disabled={isSubmitting}>
          Đăng nhập {currentRole === "ADMIN" ? "admin" : "user"}
        </Button>
        {serverMessage ? <p className="text-sm text-emerald-600">{serverMessage}</p> : null}
      </form>
    </Card>
  );
}
