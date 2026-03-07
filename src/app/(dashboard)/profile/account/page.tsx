import { getCurrentUser } from "@/services/auth-service";
import { Card } from "@/components/ui/card";

export default function ProfileAccountRoute() {
  const user = getCurrentUser("USER");

  return (
    <Card>
      <h1 className="text-3xl font-black text-ink">Thông tin tài khoản</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-[24px] bg-rose-50/60 p-5">
          <p className="text-sm text-muted">Họ tên</p>
          <p className="mt-2 text-lg font-bold text-ink">{user.fullName}</p>
        </div>
        <div className="rounded-[24px] bg-rose-50/60 p-5">
          <p className="text-sm text-muted">Email</p>
          <p className="mt-2 text-lg font-bold text-ink">{user.email}</p>
        </div>
        <div className="rounded-[24px] bg-rose-50/60 p-5">
          <p className="text-sm text-muted">Số điện thoại</p>
          <p className="mt-2 text-lg font-bold text-ink">{user.phone}</p>
        </div>
        <div className="rounded-[24px] bg-rose-50/60 p-5">
          <p className="text-sm text-muted">Vai trò</p>
          <p className="mt-2 text-lg font-bold text-ink">{user.role}</p>
        </div>
      </div>
    </Card>
  );
}
