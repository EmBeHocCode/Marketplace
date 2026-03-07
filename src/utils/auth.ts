export function getRoleLabel(role: string) {
  return role === "ADMIN" ? "Quản trị viên" : "Khách hàng";
}

export function isAdminRole(role: string | undefined) {
  return role === "ADMIN";
}
