import { Suspense } from "react";
import RentPage from "@/components/rent/RentPage";

export const metadata = {
  title: "Properties for Rent in Mumbai",
  description: "Browse rental properties across Mumbai.",
};

export default function RentPageRoute() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
      <RentPage />
    </Suspense>
  );
}