import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { getCurrentUserOrderByCode } from "@/services/profile-service";
import { formatCurrency } from "@/utils/format";

export async function OrderDetailPage({ orderCode }: { orderCode: string }) {
  const order = await getCurrentUserOrderByCode(orderCode);

  if (!order) {
    return (
      <EmptyState
        title="Không tìm thấy đơn hàng"
        description="Mã đơn này không thuộc tài khoản hiện tại hoặc chưa tồn tại."
        ctaLabel="Về danh sách đơn hàng"
        ctaLink="/profile/orders"
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Mã đơn hàng</p>
            <h1 className="mt-2 text-3xl font-black text-ink">{order.orderCode}</h1>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted">Thanh toán</p>
            <p className="mt-1 font-semibold text-ink">{order.payment.method}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Trạng thái thanh toán</p>
            <p className="mt-1 font-semibold text-ink">{order.payment.status}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Tổng tiền</p>
            <p className="mt-1 font-semibold text-ink">{formatCurrency(order.total)}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-ink">Sản phẩm trong đơn</h2>
        <div className="mt-5 space-y-4">
          {order.items.map((item) => {
            return (
              <div key={item.id} className="flex items-center justify-between rounded-[22px] bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-ink">{item.productName ?? item.productId}</p>
                  <p className="text-sm text-muted">Số lượng: {item.quantity}</p>
                </div>
                <p className="font-semibold text-ink">{formatCurrency(item.totalPrice)}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {order.assignedCodes?.length ? (
        <Card>
          <h2 className="text-2xl font-bold text-ink">Mã giao hàng số</h2>
          <div className="mt-5 space-y-4">
            {order.assignedCodes.map((code) => (
              <div key={code.id} className="rounded-[22px] border border-rose-100 bg-rose-50/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-ink">{code.code}</p>
                  <StatusBadge status={code.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <Card>
        <h2 className="text-2xl font-bold text-ink">Timeline đơn hàng</h2>
        <div className="mt-6">
          <Timeline events={order.timeline ?? []} />
        </div>
      </Card>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-ink">Cần hỗ trợ thêm cho đơn này?</p>
          <p className="mt-2 text-sm text-muted">Bạn có thể mở phiếu hỗ trợ mới hoặc gửi yêu cầu tới đội ngũ hỗ trợ.</p>
        </div>
        <Button href="/support">Tạo phiếu hỗ trợ</Button>
      </Card>
    </div>
  );
}
