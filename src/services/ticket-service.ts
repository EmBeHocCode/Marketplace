import { faqs, tickets } from "@/mock";

export function getFaqs() {
  return faqs;
}

export function getSupportTickets() {
  return tickets;
}

export function getRecentTickets() {
  return [...tickets].slice(0, 5);
}

export function getTicketsByUser(userId: string) {
  return tickets.filter((ticket) => ticket.userId === userId);
}
