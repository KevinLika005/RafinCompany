"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT_DIR = process.cwd();
const CANONICAL_HOST = "https://www.rafincompany.com";
const PUBLIC_HTML_FILES = [
  "index.html",
  "projects.html",
  "services.html",
  "siguria.html",
  "career.html",
  "project.html",
  "category.html"
];
const STATIC_HTML_FILES = [
  "index.html",
  "projects.html",
  "services.html",
  "siguria.html",
  "career.html"
];
const DYNAMIC_HTML_FILES = [
  "project.html",
  "category.html"
];
const SOURCE_FILES = [
  ".htaccess",
  "robots.txt",
  "sitemap.xml",
  ...PUBLIC_HTML_FILES,
  "js/seo-head.js",
  "js/i18n.js",
  "js/home-categories.js",
  "js/nav-projects.js",
  "js/projects-page.js",
  "js/project-page.js",
  "js/category-page.js",
  "js/home-news-section.js",
  "js/footer-company.js"
];
const ACCIDENTAL_ARTIFACT_FILES = [
  "tatus",
  "not staged for commit\uF03A"
];

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readTrackedData(relativePath, key) {
  const source = readFile(relativePath);
  const context = {
    window: { siteData: {} },
    console
  };

  vm.createContext(context);
  new vm.Script(source, { filename: relativePath }).runInContext(context);

  return context.window.siteData[key] || [];
}

function getSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function validateSitemap() {
  const sitemapXml = readFile("sitemap.xml");
  const urls = getSitemapLocs(sitemapXml);
  const projectUrls = urls.filter((url) => /\/project\.html\?slug=/.test(url));
  const categoryUrls = urls.filter((url) => /\/category\.html\?slug=/.test(url));
  const staticUrls = urls.length - projectUrls.length - categoryUrls.length;

  assert(urls.length === 62, `Expected 62 sitemap URLs, found ${urls.length}.`);
  assert(staticUrls === 10, `Expected 10 static sitemap URLs, found ${staticUrls}.`);
  assert(categoryUrls.length === 12, `Expected 12 category sitemap URLs, found ${categoryUrls.length}.`);
  assert(projectUrls.length === 40, `Expected 40 project sitemap URLs, found ${projectUrls.length}.`);
  assert(!urls.some((url) => /^http:\/\//.test(url)), "Sitemap contains http URLs.");
  assert(!urls.some((url) => /^https:\/\/rafincompany\.com/.test(url)), "Sitemap contains non-www URLs.");
  assert(!urls.some((url) => /index2\.html/.test(url)), "Sitemap contains index2.html.");
  assert(!urls.some((url) => /\/project\.html\?(?:amp;)?lang=/.test(url)), "Sitemap contains project URLs with lang before slug.");
  assert(!urls.some((url) => /\/category\.html\?(?:amp;)?lang=/.test(url)), "Sitemap contains category URLs with lang before slug.");
  assert(!urls.some((url) => /\/project\.html\?(?:amp;)?lang=(en|sq)$/.test(url)), "Sitemap contains slugless project URLs.");
  assert(!urls.some((url) => /\/category\.html\?(?:amp;)?lang=(en|sq)$/.test(url)), "Sitemap contains slugless category URLs.");
  assert(
    !urls.some(
      (url) =>
        (/\/project\.html\?slug=/.test(url) || /\/category\.html\?slug=/.test(url)) &&
        !/[?&](?:amp;)?lang=(en|sq)\b/.test(url)
    ),
    "Sitemap contains project/category URLs without lang."
  );
  assert(!/&(?!amp;|lt;|gt;|quot;|apos;)/.test(sitemapXml), "Sitemap contains unescaped ampersands.");
  assert((sitemapXml.match(/hreflang="en"/g) || []).length > 0, "Sitemap is missing hreflang=en.");
  assert((sitemapXml.match(/hreflang="sq"/g) || []).length > 0, "Sitemap is missing hreflang=sq.");
  assert((sitemapXml.match(/hreflang="x-default"/g) || []).length > 0, "Sitemap is missing hreflang=x-default.");

  const projects = readTrackedData("data/projects.js", "projects");
  const categories = readTrackedData("data/categories.js", "categories");

  projects.forEach((project) => {
    const enUrl = `${CANONICAL_HOST}/project.html?slug=${encodeURIComponent(project.slug)}&amp;lang=en`;
    const sqUrl = `${CANONICAL_HOST}/project.html?slug=${encodeURIComponent(project.slug)}&amp;lang=sq`;
    assert(sitemapXml.includes(enUrl), `Missing project EN sitemap URL for slug: ${project.slug}`);
    assert(sitemapXml.includes(sqUrl), `Missing project SQ sitemap URL for slug: ${project.slug}`);
  });

  categories.forEach((category) => {
    const enUrl = `${CANONICAL_HOST}/category.html?slug=${encodeURIComponent(category.slug)}&amp;lang=en`;
    const sqUrl = `${CANONICAL_HOST}/category.html?slug=${encodeURIComponent(category.slug)}&amp;lang=sq`;
    assert(sitemapXml.includes(enUrl), `Missing category EN sitemap URL for slug: ${category.slug}`);
    assert(sitemapXml.includes(sqUrl), `Missing category SQ sitemap URL for slug: ${category.slug}`);
  });

  return {
    total: urls.length,
    staticCount: staticUrls,
    categoryCount: categoryUrls.length,
    projectCount: projectUrls.length,
    projectSlugCount: projects.length,
    categorySlugCount: categories.length
  };
}

function validatePublicHtml() {
  STATIC_HTML_FILES.forEach((relativePath) => {
    const html = readFile(relativePath);

    assert(/<meta[^>]+name="robots"[^>]+content="index,follow"/i.test(html), `${relativePath} is missing robots.`);
    assert(/<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.rafincompany\.com\//i.test(html), `${relativePath} is missing canonical.`);
    assert(/hreflang="en"/i.test(html), `${relativePath} is missing hreflang=en.`);
    assert(/hreflang="sq"/i.test(html), `${relativePath} is missing hreflang=sq.`);
    assert(/hreflang="x-default"/i.test(html), `${relativePath} is missing hreflang=x-default.`);
    assert(/property="og:title"/i.test(html), `${relativePath} is missing og:title.`);
    assert(/property="og:description"/i.test(html), `${relativePath} is missing og:description.`);
    assert(/property="og:url"/i.test(html), `${relativePath} is missing og:url.`);
    assert(/name="twitter:card"/i.test(html), `${relativePath} is missing twitter:card.`);
    assert(/name="twitter:title"/i.test(html), `${relativePath} is missing twitter:title.`);
    assert(/name="twitter:description"/i.test(html), `${relativePath} is missing twitter:description.`);
    assert(!/name="robots"[^>]+content="noindex/i.test(html), `${relativePath} contains static noindex.`);
    assert(!/index2\.html/i.test(html), `${relativePath} still references index2.html.`);
  });

  DYNAMIC_HTML_FILES.forEach((relativePath) => {
    const html = readFile(relativePath);
    const pageName = relativePath.replace(".html", "");

    assert(/<meta[^>]+name="robots"[^>]+content="index,follow"/i.test(html), `${relativePath} is missing robots.`);
    assert(!/name="robots"[^>]+content="noindex/i.test(html), `${relativePath} contains static noindex.`);
    assert(!new RegExp(`<link[^>]+rel="canonical"[^>]+${pageName}\\.html\\?lang=`, "i").test(html), `${relativePath} contains a slugless static canonical.`);
    assert(!new RegExp(`<link[^>]+rel="alternate"[^>]+${pageName}\\.html\\?lang=`, "i").test(html), `${relativePath} contains slugless static hreflang.`);
    assert(!new RegExp(`property="og:url"[^>]+${pageName}\\.html\\?lang=`, "i").test(html), `${relativePath} contains a slugless static og:url.`);
  });
}

function validateRedirectsAndRobots() {
  const htaccess = readFile(".htaccess");
  const robots = readFile("robots.txt");

  assert(/RewriteRule \^index2\\\.html\$ https:\/\/www\.rafincompany\.com\/index\.html\?lang=en \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing the index2 redirect.");
  assert(/RewriteRule \^project\\\.html\$ https:\/\/www\.rafincompany\.com\/project\.html\?slug=%2&lang=%1 \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing project query-order canonicalization.");
  assert(/RewriteRule \^category\\\.html\$ https:\/\/www\.rafincompany\.com\/category\.html\?slug=%2&lang=%1 \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing category query-order canonicalization.");
  assert(/RewriteRule \^project\\\.html\$ https:\/\/www\.rafincompany\.com\/project\.html\?slug=%1&lang=en \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing slug-only project canonicalization.");
  assert(/RewriteRule \^category\\\.html\$ https:\/\/www\.rafincompany\.com\/category\.html\?slug=%1&lang=en \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing slug-only category canonicalization.");
  assert(/RewriteCond %\{QUERY_STRING\} !\(\?:\^\|\&\)slug= \[NC\]\s+RewriteCond %\{QUERY_STRING\} \(\?:\^\|\&\)lang=\(en\|sq\)\(\?:\&\|\$\) \[NC\]\s+RewriteRule \^project\\\.html\$ https:\/\/www\.rafincompany\.com\/projects\.html\?lang=%1 \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess project slugless redirect must capture lang immediately before using %1.");
  assert(/RewriteCond %\{QUERY_STRING\} !\(\?:\^\|\&\)slug= \[NC\]\s+RewriteCond %\{QUERY_STRING\} \(\?:\^\|\&\)lang=\(en\|sq\)\(\?:\&\|\$\) \[NC\]\s+RewriteRule \^category\\\.html\$ https:\/\/www\.rafincompany\.com\/projects\.html\?lang=%1 \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess category slugless redirect must capture lang immediately before using %1.");
  assert(/RewriteRule \^project\\\.html\$ https:\/\/www\.rafincompany\.com\/projects\.html\?lang=%1 \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing slugless project redirect with lang.");
  assert(/RewriteRule \^category\\\.html\$ https:\/\/www\.rafincompany\.com\/projects\.html\?lang=%1 \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing slugless category redirect with lang.");
  assert(/RewriteRule \^project\\\.html\$ https:\/\/www\.rafincompany\.com\/projects\.html\?lang=en \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing default slugless project redirect.");
  assert(/RewriteRule \^category\\\.html\$ https:\/\/www\.rafincompany\.com\/projects\.html\?lang=en \[R=301,L,QSD,NE\]/.test(htaccess), ".htaccess is missing default slugless category redirect.");
  assert(/RewriteCond %\{HTTP_HOST\} !\^www\\\.rafincompany\\\.com\$ \[NC,OR\]/.test(htaccess), ".htaccess is missing the canonical host condition.");
  assert(/RewriteCond %\{HTTPS\} !=on/.test(htaccess), ".htaccess is missing the HTTPS redirect condition.");
  assert(/RewriteRule \^ https:\/\/www\.rafincompany\.com%\{REQUEST_URI\} \[R=301,L,NE\]/.test(htaccess), ".htaccess is missing the canonical host rewrite.");

  assert(/User-agent:\s*\*/i.test(robots), "robots.txt is missing User-agent.");
  assert(/Allow:\s*\/$/im.test(robots), "robots.txt is missing Allow: /.");
  assert(/Disallow:\s*\/bat\/$/im.test(robots), "robots.txt is missing Disallow: /bat/.");
  assert(/Disallow:\s*\/cgi-bin\/$/im.test(robots), "robots.txt is missing Disallow: /cgi-bin/.");
  assert(/Sitemap:\s*https:\/\/www\.rafincompany\.com\/sitemap\.xml$/im.test(robots), "robots.txt sitemap line is incorrect.");
}

function validateSourceStrings() {
  SOURCE_FILES.forEach((relativePath) => {
    const content = readFile(relativePath);

    if (relativePath !== ".htaccess") {
      assert(!/index2\.html/.test(content), `${relativePath} contains an unexpected index2.html reference.`);
    }

    assert(!/http:\/\/rafincompany\.com/i.test(content), `${relativePath} contains http://rafincompany.com.`);
    assert(!/http:\/\/www\.rafincompany\.com/i.test(content), `${relativePath} contains http://www.rafincompany.com.`);
    assert(!/https:\/\/rafincompany\.com/i.test(content), `${relativePath} contains https://rafincompany.com.`);
    assert(!/project\.html\?(?:amp;)?lang=/.test(content), `${relativePath} contains project.html?lang=.`);
    assert(!/category\.html\?(?:amp;)?lang=/.test(content), `${relativePath} contains category.html?lang=.`);
  });
}

function validateArtifactsAndPerformanceHints() {
  ACCIDENTAL_ARTIFACT_FILES.forEach((relativePath) => {
    assert(!fs.existsSync(path.join(ROOT_DIR, relativePath)), `Unexpected deploy artifact exists: ${relativePath}`);
  });

  const projectPageJs = readFile("js/project-page.js");
  const categoryPageJs = readFile("js/category-page.js");
  assert(!/setAttribute\(['"]fetchpriority['"],\s*['"]high['"]\)/.test(projectPageJs), "project-page.js adds dynamic high fetchpriority.");
  assert(!/setAttribute\(['"]fetchpriority['"],\s*['"]high['"]\)/.test(categoryPageJs), "category-page.js adds dynamic high fetchpriority.");

  const highPriorityCount = PUBLIC_HTML_FILES.reduce((count, relativePath) => {
    const html = readFile(relativePath);
    return count + (html.match(/fetchpriority="high"/g) || []).length;
  }, 0);
  assert(highPriorityCount <= 3, `Expected at most 3 static high fetchpriority hints, found ${highPriorityCount}.`);

  assert(!/mCSB_buttons\.png/i.test(readFile("css/style.css")), "css/style.css references missing mCSB_buttons.png.");
}

function main() {
  const sitemapSummary = validateSitemap();
  validatePublicHtml();
  validateRedirectsAndRobots();
  validateSourceStrings();
  validateArtifactsAndPerformanceHints();

  console.log(
    [
      "SEO validation passed.",
      `Sitemap URLs: ${sitemapSummary.total}`,
      `Static URLs: ${sitemapSummary.staticCount}`,
      `Category URLs: ${sitemapSummary.categoryCount}`,
      `Project URLs: ${sitemapSummary.projectCount}`,
      `Project slugs covered: ${sitemapSummary.projectSlugCount}`,
      `Category slugs covered: ${sitemapSummary.categorySlugCount}`
    ].join("\n")
  );
}

main();
