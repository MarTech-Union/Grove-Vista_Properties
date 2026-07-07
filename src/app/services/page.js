import ServicesPageComponent from "@/components/services/ServicesPage";

export const metadata = {
  title: "Property Services",
  description:
    "Explore Grove Vista's full-service real estate offerings including leasing support, loan advisory, legal guidance and investment consulting.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Property Services | Grove Vista",
    description: "Top-notch property services in Mumbai and across India.",
    type: "website",
  },
};

export default function ServicesPageRoute() {
  return <ServicesPageComponent />;
}
