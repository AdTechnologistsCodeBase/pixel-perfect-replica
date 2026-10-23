export const siteOrigin = "https://elitecaremultispecialityhospital.in";
export const businessName = "Elitecare Multispeciality Hospital";
export const hospitalPhone = "+919709700201";
export const hospitalPhoneDisplay = "9709700201";
export const socialImagePath = "/images/hospital-exterior-1672.webp";
export const socialImageAlt = "Exterior entrance and signage of Elitecare Multispeciality Hospital";
export const socialImageDimensions = { width: 1672, height: 941 };

export type PageSeo = {
  path: string;
  canonicalPath: string;
  title: string;
  description: string;
  indexable: boolean;
};

export const seoPages = {
  home: {
    path: "/",
    canonicalPath: "/",
    title: "Elitecare Multispeciality Hospital | Kondhwa, Pune",
    description:
      "Explore medical services, home-visit information, hospital photographs and contact details for Elitecare Multispeciality Hospital in Kondhwa, Pune.",
    indexable: true,
  },
  about: {
    path: "/about",
    canonicalPath: "/about/",
    title: "About Elitecare Multispeciality Hospital | Kondhwa, Pune",
    description:
      "Learn about Elitecare Multispeciality Hospital in Kondhwa, Pune, and review its supplied service information and availability notes.",
    indexable: true,
  },
  services: {
    path: "/services",
    canonicalPath: "/services/",
    title: "Medical Services | Elitecare Multispeciality Hospital",
    description:
      "Review 13 medical service categories and availability information from Elitecare Multispeciality Hospital in Kondhwa, Pune. Call to confirm service details.",
    indexable: true,
  },
  hospital: {
    path: "/hospital",
    canonicalPath: "/hospital/",
    title: "Hospital Photos | Elitecare Multispeciality Hospital, Pune",
    description:
      "View genuine photographs of Elitecare Multispeciality Hospital, including its entrance, reception and care areas in Kondhwa, Pune.",
    indexable: true,
  },
  homeVisits: {
    path: "/home-visits",
    canonicalPath: "/home-visits/",
    title: "Doctor Home Visits | Elitecare Multispeciality Hospital",
    description:
      "See information about doctor home visits for older and bedridden patients in Kondhwa and nearby Pune areas, subject to appointment and doctor availability.",
    indexable: true,
  },
  contact: {
    path: "/contact",
    canonicalPath: "/contact/",
    title: "Contact & Location | Elitecare Multispeciality Hospital",
    description: `Call Elitecare Multispeciality Hospital at ${hospitalPhoneDisplay} or find its address at Trimurti Building on Kondhwa Main Road, Pune.`,
    indexable: true,
  },
  patientInformation: {
    path: "/patient-information",
    canonicalPath: "/patient-information/",
    title: "Patient Information & Privacy | Elitecare Multispeciality Hospital",
    description:
      "Read important service-availability, emergency, medical-information and website-privacy notices for Elitecare Multispeciality Hospital.",
    indexable: true,
  },
  doctors: {
    path: "/doctors",
    canonicalPath: "/doctors/",
    title: "Our Doctors | Elitecare Multispeciality Clinic, Pune",
    description:
      "Meet Dr. Arbaaz Shakil Khan (M.B.B.S.) and Dr. Akeel Shakil Khan (M.D. Mumbai) at Elitecare Multispeciality Clinic in Kondhwa, Pune.",
    indexable: true,
  },
  notFound: {
    path: "/not-found",
    canonicalPath: "/not-found/",
    title: "Page Not Found | Elitecare Multispeciality Hospital",
    description: "The requested page could not be found.",
    indexable: false,
  },
} satisfies Record<string, PageSeo>;

export const publicSeoPages = Object.values(seoPages);

export function findPageSeo(pathname: string): PageSeo | undefined {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return publicSeoPages.find((page) => page.path === normalizedPath);
}

export function getCanonicalUrl(page: PageSeo): string {
  return `${siteOrigin}${page.canonicalPath}`;
}

export function createStructuredData(page: PageSeo) {
  const hospitalId = `${siteOrigin}/#hospital`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Hospital",
      "@id": hospitalId,
      name: businessName,
      url: `${siteOrigin}/`,
      telephone: hospitalPhone,
      image: `${siteOrigin}${socialImagePath}`,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Shop No. 1/2/3/4, Trimurti Building, Near Crown Bakery, Kondhwa Main Road, Kondhwa BK",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411048",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: `${siteOrigin}/`,
      name: businessName,
      publisher: { "@id": hospitalId },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${getCanonicalUrl(page)}#webpage`,
      url: getCanonicalUrl(page),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${siteOrigin}/#website` },
      about: { "@id": hospitalId },
      inLanguage: "en-IN",
    },
  ];

  if (page.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteOrigin}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title.split(" | ")[0],
          item: getCanonicalUrl(page),
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
