import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
export const metadata = {
  title: "Client Testimonials",
  description:
    "Read verified client experiences with Grove Vista Properties across luxury buying, family upgrades, and high-yield investments.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Grove Vista Client Testimonials",
    description:
      "See what clients say about our end-to-end property advisory and transaction support.",
    type: "website",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
