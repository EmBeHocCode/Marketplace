import type { ReactNode } from "react";
import { UserSidebar } from "@/components/dashboard/user-sidebar";

export function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <UserSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
