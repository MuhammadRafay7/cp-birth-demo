export type SubmitResult = { status: "sent" } | { status: "unavailable"; message: string };

export interface FormsAdapter {
  subscribe(email: string): Promise<SubmitResult>;
}

const unconnectedAdapter: FormsAdapter = {
  async subscribe() {
    return {
      status: "unavailable",
      message: "Newsletter sign-ups are opening soon. In the meantime, you can reach our team through the shop.",
    };
  },
};

export const forms: FormsAdapter = unconnectedAdapter;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
