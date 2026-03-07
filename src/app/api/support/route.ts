import { NextResponse } from "next/server";
import { getFaqs, getSupportTickets } from "@/services/ticket-service";

export async function GET() {
  return NextResponse.json({
    faqs: getFaqs(),
    tickets: getSupportTickets()
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    ticket: {
      id: "ticket-new",
      ...body
    }
  });
}
