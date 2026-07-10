import { Suspense } from "react";
import SalePageComponent from "@/components/sale/SalePage";

export const metadata = {
  title: "Properties for Sale in Mumbai",
  description:
    "Browse verified luxury properties for sale across Mumbai. Apartments, villas and penthouses in Mumbai, Bangalore, Gurgaon, Noida and more.",
  alternates: {
    canonical: "/sale",
  },
  openGraph: {
    title: "Properties for Sale in Mumbai | Grove Vista",
    description:
      "Browse verified properties for sale across Mumbai with Grove Vista Properties.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties for Sale in Mumbai | Grove Vista",
    description: "Explore luxury apartments and villas across Mumbai.",
  },
};

export default function SalePageRoute() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
      <SalePageComponent />
    </Suspense>
  );
}