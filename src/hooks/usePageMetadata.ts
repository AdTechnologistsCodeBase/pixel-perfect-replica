import { useEffect } from "react";

import {
  createStructuredData,
  businessName,
  getCanonicalUrl,
  type PageSeo,
  socialImageDimensions,
  siteOrigin,
  socialImageAlt,
  socialImagePath,
} from "@/data/siteSeo";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = content;
}

export function usePageMetadata(page: PageSeo) {
  useEffect(() => {
    const canonical = getCanonicalUrl(page);
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", page.indexable ? "index, follow" : "noindex, follow");
    setMeta("property", "og:site_name", businessName);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", `${siteOrigin}${socialImagePath}`);
    setMeta("property", "og:image:type", "image/webp");
    setMeta("property", "og:image:width", String(socialImageDimensions.width));
    setMeta("property", "og:image:height", String(socialImageDimensions.height));
    setMeta("property", "og:image:alt", socialImageAlt);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", `${siteOrigin}${socialImagePath}`);
    setMeta("name", "twitter:image:alt", socialImageAlt);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;

    let structuredData = document.head.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-site-structured-data]',
    );
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.setAttribute("data-site-structured-data", "true");
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(createStructuredData(page));
  }, [page]);
}
