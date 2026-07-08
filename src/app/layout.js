import { Geist, Geist_Mono, Playfair_Display, Manrope } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://grovevistaproperties.com"),
  title: {
    default: "Grove Vista Properties",
    template: "%s | Grove Vista Properties",
  },
  description:
    "Grove Vista Properties is a modern, SEO-first real estate platform for discovering premium homes, projects and investment opportunities across India.",
  openGraph: {
    title: "Grove Vista Properties",
    description: "Premium real estate discovery and advisory services across India.",
    url: "/",
    siteName: "Grove Vista Properties",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grove Vista Properties",
    description: "Premium real estate discovery and advisory services across India.",
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? "";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
        {GA_ID && (
          <>
            <Script
              nonce={nonce}
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script nonce={nonce} id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
