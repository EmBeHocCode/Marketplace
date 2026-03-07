import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";

export function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
