import { users } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";
import { formatDate } from "@/utils/format";

export default function AdminUsersRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">User management</h1>
      <Table
        headers={["Họ tên", "Email", "Vai trò", "Ngày tham gia"]}
        rows={users.map((user) => [
          user.fullName,
          user.email,
          <Badge key={user.id} label={user.role} />,
          formatDate(user.joinedAt)
        ])}
      />
    </div>
  );
}
