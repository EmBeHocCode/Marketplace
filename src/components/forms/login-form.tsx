"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators";
import type { LoginFormValues } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { serializeSessionUser } from "@/services/auth-service";

export function LoginForm({
  presetEmail,
  presetPassword,
  redirect,
  registered
}: {
  presetEmail: string;
  presetPassword: string;
  redirect?: string;
  registered?: boolean;
}) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error">("success");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: presetEmail,
      password: presetPassword
    }
  });

  useEffect(() => {
    reset({
      email: presetEmail,
      password: presetPassword
    });

    if (registered) {
      setMessageTone("success");
      setServerMessage("Đăng ký thành công. Hãy đăng nhập để tiếp tục.");
      return;
    }

    setServerMessage("");
  }, [presetEmail, presetPassword, registered, reset]);

  const onSubmit = async (values: LoginFormValues) => {
    setServerMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      setMessageTone("error");
      setServerMessage(payload.message ?? "Đăng nhập thất bại.");
      return;
    }

    document.cookie = `meowmarket-session=${payload.session.token}; path=/`;
    document.cookie = `meowmarket-role=${payload.user.role}; path=/`;
    document.cookie = `meowmarket-user=${serializeSessionUser(payload.user)}; path=/`;

    setMessageTone("success");
    setServerMessage("Đăng nhập thành công. Đang chuyển hướng...");
    router.push(redirect ?? (payload.user.role === "ADMIN" ? "/admin" : "/profile"));
    router.refresh();
  };

  return (
    <Card className="w-full max-w-lg">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-ink">Đăng nhập MeowMarket</h1>
        <p className="text-sm leading-7 text-muted">
          Dùng email và mật khẩu để đăng nhập. Hệ thống sẽ tự nhận diện tài khoản khách hàng hoặc quản trị viên.
        </p>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-primary">
            Quên mật khẩu?
          </Link>
          <Link href="/register" className="text-muted">
            Chưa có tài khoản?
          </Link>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Đăng nhập
        </Button>
        {serverMessage ? (
          <p
            className={`text-sm ${messageTone === "error" ? "text-rose-500" : "text-emerald-600"}`}
          >
            {serverMessage}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
