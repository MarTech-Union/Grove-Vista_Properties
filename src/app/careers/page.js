import CareersPageComponent from "@/components/about/careers/page";

export const metadata = {
	title: "Careers in Mumbai, India",
	description:
		"Explore careers at Grove Vista Properties in Mumbai, India and apply for real estate roles in sales, operations, and advisory.",
	alternates: {
		canonical: "/careers",
	},
	openGraph: {
		title: "Careers at Grove Vista Properties | Mumbai, India",
		description:
			"Join Grove Vista Properties in Mumbai and grow your career in a high-performance real estate team.",
		type: "website",
	},
};

export default function CareersPageRoute() {
	return <CareersPageComponent />;
}
