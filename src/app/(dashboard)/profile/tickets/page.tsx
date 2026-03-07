import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getTicketsByUser } from "@/services/ticket-service";
import { formatDate } from "@/utils/format";

export default function ProfileTicketsRoute() {
  const tickets = getTicketsByUser("user-01");

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Ticket hỗ trợ</h1>
      {tickets.map((ticket) => (
        <Card key={ticket.id}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-ink">{ticket.subject}</p>
              <p className="mt-2 text-sm text-muted">
                {ticket.category} • {formatDate(ticket.createdAt)}
              </p>
            </div>
            <Badge label={ticket.status} status={ticket.status} />
          </div>
          <div className="mt-5 space-y-3">
            {ticket.messages.map((message) => (
              <div key={message.id} className="rounded-[20px] bg-rose-50/60 p-4 text-sm text-muted">
                <p className="font-semibold text-ink">{message.sender}</p>
                <p className="mt-2 leading-7">{message.body}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
