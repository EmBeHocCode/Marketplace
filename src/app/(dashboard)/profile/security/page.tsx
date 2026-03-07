import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfileSecurityRoute() {
  return (
    <Card>
      <h1 className="text-3xl font-black text-ink">Đổi mật khẩu</h1>
      <div className="mt-6 space-y-4">
        <input type="password" placeholder="Mật khẩu hiện tại" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        <input type="password" placeholder="Mật khẩu mới" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        <input type="password" placeholder="Xác nhận mật khẩu mới" className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none" />
        <Button>Lưu thay đổi</Button>
      </div>
    </Card>
  );
}
