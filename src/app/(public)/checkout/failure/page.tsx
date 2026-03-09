import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutFailureRoute() {
  return (
    <Card className="max-w-3xl bg-gradient-to-br from-[#fff3f3] to-white">
      <h1 className="text-4xl font-black text-ink">Thanh toán chưa thành công</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        Giao dịch chưa được xác nhận. Bạn có thể thử lại cổng thanh toán khác hoặc liên hệ hỗ
        trợ nếu phản hồi thanh toán gặp lỗi.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/checkout">Thử lại</Button>
        <Button href="/support" variant="outline">
          Liên hệ hỗ trợ
        </Button>
      </div>
    </Card>
  );
}
