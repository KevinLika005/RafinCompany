import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(ROOT_DIR, "sitemap.xml");
const CANONICAL_HOST = "https://www.rafincompany.com";
const LANGS = ["en", "sq"];
const STATIC_PAGES = [
  { path: "index.html", changefreq: "weekly", priority: "1.0" },
  { path: "projects.html", changefreq: "weekly", priority: "0.9" },
  { path: "services.html", changefreq: "weekly", priority: "0.8" },
  { path: "siguria.html", changefreq: "weekly", priority: "0.8" },
  { path: "career.html", changefreq: "weekly", priority: "0.8" }
];

function readTrackedData(filePath, key) {
  const absolutePath = path.join(ROOT_DIR, filePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const context = {
    window: { siteData: {} },
    console
  };

  vm.createContext(context);
  new vm.Script(source, { filename: absolutePath }).runInContext(context);

  return context.window.siteData[key] || [];
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isValidSlug(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function appendLanguageParam(routePath, lang) {
  return routePath.indexOf("?") === -1
    ? `${routePath}?lang=${encodeURIComponent(lang)}`
    : `${routePath}&lang=${encodeURIComponent(lang)}`;
}

function toAbsoluteUrl(routePath) {
  return `${CANONICAL_HOST}/${routePath}`;
}

function getLastModifiedDate(filePaths) {
  const latestMs = filePaths.reduce((maxMs, relativePath) => {
    const absolutePath = path.join(ROOT_DIR, relativePath);
    const mtimeMs = fs.statSync(absolutePath).mtimeMs;
    return Math.max(maxMs, mtimeMs);
  }, 0);

  return new Date(latestMs).toISOString().slice(0, 10);
}

function buildUrlEntry(routePath, options) {
  const lastmod = options.lastmod;
  const changefreq = options.changefreq;
  const priority = options.priority;
  const enUrl = toAbsoluteUrl(appendLanguageParam(routePath, "en"));
  const sqUrl = toAbsoluteUrl(appendLanguageParam(routePath, "sq"));

  return LANGS.map((lang) => {
    const loc = lang === "en" ? enUrl : sqUrl;

    return [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />`,
      `    <xhtml:link rel="alternate" hreflang="sq" href="${escapeXml(sqUrl)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}" />`,
      `    <lastmod>${lastmod}</lastmod>`,
      changefreq ? `    <changefreq>${changefreq}</changefreq>` : "",
      priority ? `    <priority>${priority}</priority>` : "",
      "  </url>"
    ].filter(Boolean).join("\n");
  });
}

function buildSitemapEntries() {
  const categories = readTrackedData("data/categories.js", "categories");
  const projects = readTrackedData("data/projects.js", "projects");
  const entries = [];

  STATIC_PAGES.forEach((page) => {
    entries.push(
      ...buildUrlEntry(page.path, {
        lastmod: getLastModifiedDate([page.path]),
        changefreq: page.changefreq,
        priority: page.priority
      })
    );
  });

  categories
    .filter((category) => isValidSlug(category.slug))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .forEach((category) => {
      entries.push(
        ...buildUrlEntry(`category.html?slug=${encodeURIComponent(category.slug)}`, {
          lastmod: getLastModifiedDate(["category.html", "data/categories.js"]),
          changefreq: "weekly",
          priority: "0.8"
        })
      );
    });

  projects
    .filter((project) => isValidSlug(project.slug))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .forEach((project) => {
      entries.push(
        ...buildUrlEntry(`project.html?slug=${encodeURIComponent(project.slug)}`, {
          lastmod: getLastModifiedDate(["project.html", "data/projects.js"]),
          changefreq: "monthly",
          priority: "0.7"
        })
      );
    });

  return {
    entries,
    categoryCount: categories.filter((category) => isValidSlug(category.slug)).length,
    projectCount: projects.filter((project) => isValidSlug(project.slug)).length
  };
}

function main() {
  const { entries, categoryCount, projectCount } = buildSitemapEntries();
  const expectedCount = (STATIC_PAGES.length * LANGS.length) + (categoryCount * LANGS.length) + (projectCount * LANGS.length);

  if (entries.length !== expectedCount) {
    throw new Error(`Unexpected sitemap entry count: got ${entries.length}, expected ${expectedCount}.`);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
    ""
  ].join("\n");

  fs.writeFileSync(OUTPUT_FILE, xml, "utf8");
  console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
}

main();
