import { tenant } from "@/lib/site";

export type SubmitResult = { status: "sent" } | { status: "unavailable"; message: string };

export type ContactMessage = { name: string; email: string; message: string };

export interface FormsAdapter {
  subscribe(email: string): Promise<SubmitResult>;
  sendMessage(message: ContactMessage): Promise<SubmitResult>;
}

const unconnectedAdapter: FormsAdapter = {
  async subscribe() {
    return {
      status: "unavailable",
      message: "Newsletter sign-ups are opening soon. In the meantime, you can reach our team through the shop.",
    };
  },
  async sendMessage() {
    return {
      status: "unavailable",
      message: `This form isn't connected yet. Please send your message through our shop's contact page at ${tenant.contactUrl.replace("https://", "")}.`,
    };
  },
};

export const forms: FormsAdapter = unconnectedAdapter;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
