import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";
import { getOrdersByUser } from "@/services/order-service";
import { formatCurrency, formatDate } from "@/utils/format";

export default function ProfilePaymentsRoute() {
  const payments = getOrdersByUser("user-01").map((order) => order.payment);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Lịch sử thanh toán</h1>
      <Table
        headers={["Mã thanh toán", "Ngày", "Phương thức", "Số tiền", "Trạng thái"]}
        rows={payments.map((payment) => [
          payment.id,
          formatDate(payment.createdAt),
          payment.method,
          formatCurrency(payment.amount),
          <Badge key={payment.id} label={payment.status} status={payment.status} />
        ])}
      />
    </div>
  );
}
