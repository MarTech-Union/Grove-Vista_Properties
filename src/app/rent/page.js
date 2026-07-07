import { Suspense } from "react";
import RentPage from "@/components/rent/RentPage";

export const metadata = {
  title: "Properties for Rent in India",
  description: "Browse rental properties across India.",
};

export default function RentPageRoute() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
      <RentPage />
    </Suspense>
  );
}