// src/app/news/page.js

export const metadata = {
  title: "Real Estate News | Grove Vista Properties",
  description: "Stay ahead with the latest Mumbai real estate news, market updates, and investment insights from Grove Vista Properties.",
};

import NewsListPage from "@/components/news/NewsListPage";

export default function NewsPage() {
  return <NewsListPage />;
}
