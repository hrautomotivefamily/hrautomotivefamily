import type { Metadata } from "next";
import { BusinessCards } from "@/components/BusinessCards";

export const metadata: Metadata = {
  title: "Business Cards",
  description:
    "Premium HR Automotive business card designs using the exact brand palette and typography.",
};

export default function BusinessCardsPage() {
  return <BusinessCards />;
}
