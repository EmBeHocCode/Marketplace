import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { getCurrentSessionUser } from "@/services/auth/server-session-service";

export default async function ProfileAccountRoute() {
  const user = await getCurrentSessionUser();

  if (!user) {
    return (
      <EmptyState
        title="Không tải được tài khoản"
        description="Phiên đăng nhập hiện tại không hợp lệ. Hãy đăng nhập lại."
        ctaLabel="Đăng nhập lại"
        ctaLink="/login"
      />
    );
  }

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
          <p className="mt-2 text-lg font-bold text-ink">{user.phone || "Chưa cập nhật"}</p>
        </div>
        <div className="rounded-[24px] bg-rose-50/60 p-5">
          <p className="text-sm text-muted">Vai trò</p>
          <p className="mt-2 text-lg font-bold text-ink">{user.role}</p>
        </div>
      </div>
    </Card>
  );
}
