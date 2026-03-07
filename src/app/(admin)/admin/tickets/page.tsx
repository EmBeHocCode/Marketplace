import { tickets } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";
import { formatDate } from "@/utils/format";

export default function AdminTicketsRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Ticket support</h1>
      <Table
        headers={["Tiêu đề", "Danh mục", "Ngày", "Trạng thái"]}
        rows={tickets.map((ticket) => [
          ticket.subject,
          ticket.category,
          formatDate(ticket.createdAt),
          <Badge key={ticket.id} label={ticket.status} status={ticket.status} />
        ])}
      />
    </div>
  );
}
