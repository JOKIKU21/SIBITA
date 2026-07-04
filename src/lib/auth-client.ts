import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:3000",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    emailOTPClient(),
  ],
});
