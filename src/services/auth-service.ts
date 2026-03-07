import { users } from "@/mock";

export function getCurrentUser(role: "USER" | "ADMIN" = "USER") {
  return users.find((user) => user.role === role) ?? users[0];
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

export function authenticateMockUser(email: string, role: "USER" | "ADMIN") {
  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.role === role
  );
}
