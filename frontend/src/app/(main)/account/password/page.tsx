import type { Metadata } from "next";
import { PasswordPageContent } from "./content";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Update your account password.",
};

export default function PasswordPage() {
  return <PasswordPageContent />;
}
