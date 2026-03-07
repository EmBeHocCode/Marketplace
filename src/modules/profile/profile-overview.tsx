import { orders, products } from "@/mock";
import { getCurrentUser } from "@/services/auth-service";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils/format";

export function ProfileOverview() {
  const user = getCurrentUser("USER");
  const latestOrder = orders[0];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-[#fff0f6] to-[#eef3ff]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Tài khoản</p>
            <h1 className="mt-3 text-3xl font-black text-ink">{user.fullName}</h1>
            <p className="mt-2 text-sm leading-7 text-muted">
              {user.email} • {user.phone}
            </p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-black text-white">
            {user.avatar}
          </div>
        </div>
      </Card>
      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Tổng đơn hàng</p>
          <p className="mt-3 text-3xl font-black text-ink">{orders.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Đã chi tiêu</p>
          <p className="mt-3 text-3xl font-black text-ink">
            {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Sản phẩm yêu thích</p>
          <p className="mt-3 text-3xl font-black text-ink">{products.slice(0, 3).length}</p>
        </Card>
      </div>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Đơn gần nhất</p>
            <p className="mt-2 text-2xl font-bold text-ink">{latestOrder.orderCode}</p>
          </div>
          <Badge label={latestOrder.status} status={latestOrder.status} />
        </div>
        <p className="mt-4 text-sm leading-7 text-muted">
          Tạo ngày {formatDate(latestOrder.createdAt)} với tổng thanh toán {formatCurrency(latestOrder.total)}.
        </p>
      </Card>
    </div>
  );
}
