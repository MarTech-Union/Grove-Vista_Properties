import { blogs } from "@/data/blogs";
import { newsArticles } from "@/data/news";

const BASE = "https://grovevistaproperties.com";

const STATIC_ROUTES = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/sale", priority: 0.9, changeFrequency: "daily" },
  { url: "/rent", priority: 0.9, changeFrequency: "daily" },
  { url: "/off-plan", priority: 0.9, changeFrequency: "daily" },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { url: "/about", priority: 0.7, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { url: "/careers", priority: 0.6, changeFrequency: "monthly" },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" },
  
  { url: "/testimonials", priority: 0.5, changeFrequency: "monthly" },
  { url: "/news", priority: 0.8, changeFrequency: "weekly" },
  { url: "/godrej-properties", priority: 0.7, changeFrequency: "weekly" },
  { url: "/lodha-group", priority: 0.7, changeFrequency: "weekly" },
  { url: "/marathon-group", priority: 0.7, changeFrequency: "weekly" },
  { url: "/oberoi-realty", priority: 0.7, changeFrequency: "weekly" },
  { url: "/piramal-realty", priority: 0.7, changeFrequency: "weekly" },
];

export default function sitemap() {
  const now = new Date().toISOString();

  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogEntries = blogs.map((blog) => ({
    url: `${BASE}/blog/${blog.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsEntries = newsArticles.map((article) => ({
    url: `${BASE}/news/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...newsEntries];
}
