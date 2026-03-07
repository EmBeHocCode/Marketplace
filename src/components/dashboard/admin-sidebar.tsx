import { adminSidebarItems } from "@/config/site";
import { SidebarShell } from "@/components/layout/sidebar-shell";

export function AdminSidebar() {
  return <SidebarShell title="Admin Dashboard" items={adminSidebarItems} />;
}
