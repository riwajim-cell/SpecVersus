import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base domain configuration - can be overridden via environment variable
const BASE_URL = (process.env.SITE_URL || 'https://specversus.dpdns.org').replace(/\/+$/, '');

// Load comparison dataset
const dataFilePath = path.join(__dirname, '../src/data/comparisonsData.json');
let comparisons = [];

try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  comparisons = JSON.parse(rawData);
} catch (err) {
  console.error('Failed to read comparisons dataset:', err);
  process.exit(1);
}

// Extract distinct categories
const categories = [...new Set(comparisons.map((c) => c.category).filter(Boolean))];

// Define static main pages
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'monthly' },
];

const today = new Date().toISOString().split('T')[0];

// Build XML entries
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

// 1. Static pages
staticPages.forEach((page) => {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}${page.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
});

// 2. Category routes
categories.forEach((cat) => {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
});

// 3. Dynamic programmatic comparison routes
comparisons.forEach((item) => {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/compare/${item.slug}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

// Ensure /public exists and write sitemap.xml
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf-8');

console.log(`✅ Sitemap successfully generated at: ${sitemapPath}`);
console.log(`📊 Total Indexed URLs: ${staticPages.length + categories.length + comparisons.length}`);
