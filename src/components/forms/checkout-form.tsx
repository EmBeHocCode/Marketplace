"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/lib/validators";
import type { CheckoutFormValues } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PaymentMethodSelector } from "@/components/forms/payment-method-selector";

export function CheckoutForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "VNPAY"
    }
  });

  const onSubmit = async () => {
    setSubmitted(true);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-ink">Thông tin thanh toán</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("fullName")} placeholder="Họ và tên" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        {errors.fullName ? <p className="text-sm text-rose-500">{errors.fullName.message}</p> : null}
        <input {...register("email")} placeholder="Email" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : null}
        <input {...register("phone")} placeholder="Số điện thoại" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        {errors.phone ? <p className="text-sm text-rose-500">{errors.phone.message}</p> : null}
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <PaymentMethodSelector value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.paymentMethod ? <p className="text-sm text-rose-500">{errors.paymentMethod.message}</p> : null}
        <textarea {...register("note")} rows={4} placeholder="Ghi chú đơn hàng" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        <Button type="submit" disabled={isSubmitting}>
          Xác nhận thanh toán
        </Button>
        {submitted ? <p className="text-sm text-emerald-600">Đơn mock đã sẵn sàng chuyển qua payment gateway.</p> : null}
      </form>
    </Card>
  );
}
