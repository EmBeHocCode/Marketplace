import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutSuccessRoute() {
  return (
    <Card className="max-w-3xl bg-gradient-to-br from-[#eefaf5] to-white">
      <h1 className="text-4xl font-black text-ink">Thanh toán thành công</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        Giao dịch đã được ghi nhận. Hệ thống sẽ chuyển sang cấp mã gift card hoặc cấp phát dịch
        vụ ngay sau khi nhận phản hồi thanh toán.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/profile/orders">Xem đơn hàng</Button>
        <Button href="/products" variant="outline">
          Tiếp tục mua sắm
        </Button>
      </div>
    </Card>
  );
}
