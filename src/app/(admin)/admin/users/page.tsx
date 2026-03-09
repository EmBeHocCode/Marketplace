import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";
import { getUsers } from "@/services/user-service";
import { formatDate } from "@/utils/format";

export default async function AdminUsersRoute() {
  const users = await getUsers();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Quản lý người dùng</h1>
      <Table
        headers={["Họ tên", "Email", "Vai trò", "Ngày tham gia"]}
        rows={users.map((user) => [
          user.fullName,
          user.email,
          <Badge key={user.id} label={user.role === "ADMIN" ? "Quản trị viên" : "Khách hàng"} />,
          formatDate(user.joinedAt)
        ])}
      />
    </div>
  );
}
