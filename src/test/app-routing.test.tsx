import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { hospitalImages } from "@/data/hospitalImages";
import { medicalServices } from "@/data/medicalServices";
import { createStructuredData, findPageSeo, seoPages, siteOrigin } from "@/data/siteSeo";

describe("App routing", () => {
  it("renders the homepage for /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /medical services in kondhwa, pune/i,
      }),
    ).toBeInTheDocument();
  });

  it("credits Vtechnex in the footer with its official website link", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Vtechnex" })).toHaveAttribute(
      "href",
      "https://www.vtechnex.com/",
    );
    expect(screen.getByRole("link", { name: "Vtechnex" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.getByText(/website built by/i)).toBeInTheDocument();
  });

  it("renders the not-found page for unknown paths", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });

  it("renders the supplied hospital phone number and street address", () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Shop No\. 1\/2\/3\/4, Trimurti Building/i)).toHaveLength(2);
    expect(screen.getAllByText(/Near Crown Bakery, Kondhwa Main Road/i)).toHaveLength(2);
    expect(screen.getAllByText(/Kondhwa BK, Pune - 411048/i)).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "9709700201" })).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Call Elitecare Multispeciality Hospital" }),
    ).toHaveAttribute("href", "tel:+919709700201");
    expect(screen.getAllByRole("link", { name: "9709700201" })[0]).toHaveAttribute(
      "href",
      "tel:+919709700201",
    );
    expect(screen.getByRole("link", { name: /get directions/i })).toHaveAttribute(
      "href",
      expect.stringContaining("google.com/maps/search/"),
    );
  });

  it("publishes unique canonical SEO metadata and verified hospital structured data", () => {
    render(
      <MemoryRouter initialEntries={["/services"]}>
        <App />
      </MemoryRouter>,
    );

    expect(document.title).toBe(seoPages.services.title);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${siteOrigin}/services/`,
    );
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${siteOrigin}/images/hospital-exterior-1360.webp`,
    );

    const schema = createStructuredData(seoPages.contact);
    const hospital = schema["@graph"].find((item) => item["@type"] === "Hospital");
    expect(hospital).toMatchObject({
      name: "Elitecare Multispeciality Hospital",
      telephone: "+919709700201",
      address: {
        postalCode: "411048",
        addressCountry: "IN",
      },
    });
    expect(hospital).not.toHaveProperty("openingHours");
    expect(hospital).not.toHaveProperty("aggregateRating");
  });

  it("uses unique metadata and canonicals for all indexable routes", () => {
    const indexablePages = Object.values(seoPages).filter((page) => page.indexable);
    const titles = indexablePages.map((page) => page.title);
    const canonicalPaths = indexablePages.map((page) => page.canonicalPath);

    expect(new Set(titles).size).toBe(indexablePages.length);
    expect(new Set(canonicalPaths).size).toBe(indexablePages.length);
    expect(indexablePages.every((page) => page.description.length > 0)).toBe(true);
    expect(indexablePages.every((page) => page.canonicalPath.startsWith("/"))).toBe(true);
    expect(findPageSeo("/about/")).toBe(seoPages.about);
    expect(seoPages.doctors.indexable).toBe(true);
    expect(seoPages.notFound.indexable).toBe(false);
  });

  it("publishes the supplied doctor profiles and clinic description", () => {
    render(
      <MemoryRouter initialEntries={["/doctors"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Dr. Arbaaz Shakil Khan", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/M\.B\.B\.S\./i)).toBeInTheDocument();
    expect(screen.getByText(/HBTMC Mumbai/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr\. R\.N\. Cooper Hospital/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Dr. Akeel Shakil Khan", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/M\.D\. \(Mumbai\)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/quality, affordable, and patient-centered healthcare for all age groups/i),
    ).toBeInTheDocument();
  });

  it("introduces the clinic on the About page and links to doctor profiles", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/preventive care, health check-ups, vaccinations, and minor procedures/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /meet our doctors/i })).toHaveAttribute(
      "href",
      "/doctors/",
    );
  });

  it("renders all supplied medical service categories", () => {
    render(
      <MemoryRouter initialEntries={["/services"]}>
        <App />
      </MemoryRouter>,
    );

    expect(medicalServices).toHaveLength(13);
    for (const service of medicalServices) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
    }
    expect(screen.getByText(/Nebulization, if indicated and available/i)).toBeInTheDocument();
    expect(screen.getByText(/Oxygen Therapy, if equipped/i)).toBeInTheDocument();
    expect(screen.getByText(/Plaster and Splint Application, if available/i)).toBeInTheDocument();
  });

  it("renders the home visit area and appointment availability qualification", () => {
    render(
      <MemoryRouter initialEntries={["/home-visits"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /doctor home visits for senior citizens & bedridden patients/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/subject to appointment and doctor availability/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /call to ask about home visits/i })).toHaveLength(2);
  });

  it("renders every supplied hospital photograph in the gallery", () => {
    render(
      <MemoryRouter initialEntries={["/hospital"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("button", { name: /open photo:/i })).toHaveLength(
      hospitalImages.length,
    );
    const galleryImages = screen.getAllByRole("img");
    expect(galleryImages.every((image) => image.getAttribute("srcset"))).toBe(true);
    expect(galleryImages.every((image) => image.getAttribute("loading") === "lazy")).toBe(true);
    expect(galleryImages.every((image) => image.getAttribute("width"))).toBe(true);
    expect(galleryImages.every((image) => image.getAttribute("height"))).toBe(true);
  });

  it("prioritizes the responsive homepage hero image", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const heroImage = screen.getByRole("img", {
      name: /exterior entrance and signage of elitecare/i,
    });
    expect(heroImage).toHaveAttribute("fetchpriority", "high");
    expect(heroImage).toHaveAttribute("srcset");
    expect(heroImage).not.toHaveAttribute("loading", "lazy");
  });

  it("opens mobile navigation and closes it after a route is selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(menuButton);

    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(mobileNavigation).toBeVisible();
    fireEvent.click(within(mobileNavigation).getByRole("link", { name: "Home Visits" }));

    expect(
      screen.getByRole("heading", {
        name: /doctor home visits for senior citizens & bedridden patients/i,
      }),
    ).toBeInTheDocument();
    expect(mobileNavigation).not.toBeVisible();
  });
});
