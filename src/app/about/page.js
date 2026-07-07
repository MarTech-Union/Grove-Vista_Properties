import AboutUsPageComponent from "@/components/about/AboutUsPage";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Grove Vista Properties, our mission, vision, values, and why clients across India trust us for high-value property advisory.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Grove Vista Properties",
    description: "Meet the team and values behind Grove Vista Properties.",
    type: "website",
  },
};

export default function AboutUsRoutePage() {
  return <AboutUsPageComponent />;
}
