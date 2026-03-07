export interface LoginFormValues {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface TicketFormValues {
  subject: string;
  category: string;
  message: string;
}

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: "VNPAY" | "MOMO" | "ZALOPAY" | "CRYPTO";
  note?: string;
}
