const fs = require("fs");
const path = require("path");

const urls = [
  { loc: "https://pray-for.vercel.app/", changefreq: "monthly", priority: 1.0 },
  {
    loc: "https://pray-for.vercel.app/login",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    loc: "https://pray-for.vercel.app/signup",
    changefreq: "monthly",
    priority: 0.8,
  },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "public", "sitemap.xml"),
  sitemap,
  "utf8"
);
console.log("Sitemap has been generated!");
