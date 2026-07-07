import { Suspense } from "react";
import OffPlanPage from "@/components/off-plan/OffPlanPage";

export const metadata = {
  title: "Off-Plan Properties in India",
  description: "Explore RERA-registered off-plan and pre-launch projects across India's top cities. Flexible payment plans, verified developers, expert advisory.",
  alternates: { canonical: "/off-plan" },
  openGraph: {
    title: "Off-Plan Properties in India | Grove Vista",
    description: "Invest early in India's most exciting upcoming projects with Grove Vista Properties.",
    type: "website",
  },
};

export default function OffPlanPageRoute() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
      <OffPlanPage />
    </Suspense>
  );
}