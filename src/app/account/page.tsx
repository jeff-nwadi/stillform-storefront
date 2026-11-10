import type { Metadata } from "next";
import { AuthForm } from "@/components/account/auth-form";

export const metadata: Metadata = { title: "Your account" };

export default function AccountPage() {
  return <AuthForm />;
}
