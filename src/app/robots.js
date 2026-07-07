export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/gvp-admin/", "/api/"],
      },
    ],
    sitemap: "https://grovevistaproperties.com/sitemap.xml",
  };
}
