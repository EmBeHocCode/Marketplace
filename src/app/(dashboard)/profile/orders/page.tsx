import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";
import { getOrdersByUser } from "@/services/order-service";
import { formatCurrency, formatDate } from "@/utils/format";

export default function ProfileOrdersRoute() {
  const orders = getOrdersByUser("user-01");

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Đơn hàng</h1>
      <Table
        headers={["Mã đơn", "Ngày", "Tổng tiền", "Thanh toán", "Trạng thái"]}
        rows={orders.map((order) => [
          order.orderCode,
          formatDate(order.createdAt),
          formatCurrency(order.total),
          order.payment.method,
          <Badge key={order.id} label={order.status} status={order.status} />
        ])}
      />
    </div>
  );
}
