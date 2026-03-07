"use client";

import { useMemo } from "react";
import { useCartStore } from "@/hooks/use-cart-store";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { OrderSummary } from "@/components/forms/order-summary";
import { Card } from "@/components/ui/card";
import { getOrderTotals } from "@/services/order-service";

export function CheckoutPage() {
  const { items, couponCode } = useCartStore();
  const totals = useMemo(
    () =>
      getOrderTotals(
        items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        couponCode
      ),
    [items, couponCode]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <CheckoutForm />
      <div className="space-y-4">
        <OrderSummary
          subtotal={totals.subtotal}
          discount={totals.discount}
          total={totals.total}
        />
        <Card>
          <h3 className="text-xl font-bold text-ink">Trạng thái</h3>
          <p className="mt-4 text-sm leading-7 text-muted">
            Payment layer được tách riêng để tích hợp VNPay, Momo, ZaloPay và crypto sau này.
          </p>
        </Card>
      </div>
    </div>
  );
}
