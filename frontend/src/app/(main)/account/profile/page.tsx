import type { Metadata } from "next";
import { ProfilePageContent } from "./content";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile settings.",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
