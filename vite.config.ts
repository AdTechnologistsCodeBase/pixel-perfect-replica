import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer, defineConfig } from "vite";

import {
  createStructuredData,
  businessName,
  publicSeoPages,
  siteOrigin,
  socialImageAlt,
  socialImageDimensions,
  socialImagePath,
} from "./src/data/siteSeo";
import { hospitalExteriorImage } from "./src/data/hospitalImages";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderSeoHead(page: (typeof publicSeoPages)[number]): string {
  const canonical = `${siteOrigin}${page.canonicalPath}`;
  const tags = [
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${businessName}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:image" content="${siteOrigin}${socialImagePath}" />`,
    '<meta property="og:image:type" content="image/webp" />',
    `<meta property="og:image:width" content="${socialImageDimensions.width}" />`,
    `<meta property="og:image:height" content="${socialImageDimensions.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(socialImageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${siteOrigin}${socialImagePath}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(socialImageAlt)}" />`,
  ];

  if (!page.indexable) {
    tags.push('<meta name="robots" content="noindex, follow" />');
  }

  if (page.path === "/") {
    tags.push(
      `<link rel="preload" as="image" href="${hospitalExteriorImage.src}" imagesrcset="${hospitalExteriorImage.srcSet}" imagesizes="${hospitalExteriorImage.sizes}" fetchpriority="high" />`,
    );
  }

  const structuredData = JSON.stringify(createStructuredData(page)).replaceAll("<", "\\u003c");
  tags.push(
    `<script type="application/ld+json" data-site-structured-data="true">${structuredData}</script>`,
  );
  return tags.join("\n    ");
}

function seoPrerenderPlugin() {
  return {
    name: "elitecare-seo-prerender",
    apply: "build" as const,
    async closeBundle() {
      const distDirectory = path.resolve(__dirname, "dist");
      const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
      const server = await createServer({
        configFile: false,
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "src"),
          },
        },
        server: { middlewareMode: true },
        appType: "custom",
        logLevel: "error",
      });

      try {
        const { default: App } = await server.ssrLoadModule("/src/App.tsx");

        for (const page of publicSeoPages) {
          const renderedApp = renderToString(
            createElement(StaticRouter, { location: page.path }, createElement(App)),
          );
          const html = template
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
            .replace(/<meta\s+name="description"[\s\S]*?>/, "")
            .replace("</head>", `    ${renderSeoHead(page)}\n  </head>`)
            .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`);
          const pageDirectory =
            page.path === "/"
              ? distDirectory
              : path.join(distDirectory, page.canonicalPath.slice(1));

          await mkdir(pageDirectory, { recursive: true });
          await writeFile(path.join(pageDirectory, "index.html"), html);

          if (page.path === "/not-found") {
            await writeFile(path.join(distDirectory, "404.html"), html);
          }
        }
      } finally {
        await server.close();
      }

      const sitemapUrls = publicSeoPages
        .filter((page) => page.indexable)
        .map((page) => `  <url><loc>${siteOrigin}${page.canonicalPath}</loc></url>`)
        .join("\n");
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        sitemapUrls,
        "</urlset>",
        "",
      ].join("\n");

      await writeFile(path.join(distDirectory, "sitemap.xml"), sitemap);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPrerenderPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
