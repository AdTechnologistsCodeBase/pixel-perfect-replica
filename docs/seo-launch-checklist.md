# SEO implementation and launch checklist

This document records implemented website changes and the owner actions that require access to external accounts or confirmation of current hospital information. Keyword themes below are proposed targets, not measured search-volume data or ranking guarantees.

## Implemented technical SEO

- Public React Router pages are prerendered to static HTML during `bun run build`; important text and page metadata are present in the initial response before JavaScript runs.
- Each public page has its own title, description, HTTPS canonical URL on the supplied apex domain, Open Graph metadata, Twitter card metadata, and JSON-LD.
- The Hospital entity uses the owner-confirmed name, telephone, and street address. No coordinates, opening hours, reviews, ratings, clinicians, credentials, or unsupported emergency capabilities are asserted in structured data.
- `public/robots.txt` allows crawling and names the canonical sitemap. The build generates `dist/sitemap.xml` from the indexable page list without stale modification dates.
- Vercel is configured to use trailing-slash URLs and redirect legacy routes. All intended routes have static output, so a blanket rewrite is not needed; the build emits a custom `404.html` to avoid treating unknown URLs as successful homepage responses.
- `/doctors/` remains available to visitors but is marked `noindex` because verified doctor details have not been supplied. Legacy `/departments`, `/facilities`, and `/home` routes are redirects and are omitted from the sitemap.
- The Contact page and shared header/footer show a working `tel:` link and the supplied address. Directions use a Google Maps address search link, not guessed coordinates. WhatsApp is not configured because no separate WhatsApp confirmation was supplied.
- Genuine source photographs remain in `src/assets/hospital-photo-sources/`; the build produces compressed WebP responsive variants. The hero image is preloaded at high priority, while gallery and below-the-fold images use lazy loading, intrinsic dimensions, `srcset`, and `sizes`.
- The owner-supplied logo generates a 32-pixel favicon, 192-pixel icon, and 180-pixel Apple touch icon during the same image optimization step.
- Vercel sends a seven-day cache lifetime with stale-while-revalidate for optimized images and the favicon/touch icon.
- Existing service availability qualifications are retained. The homepage no longer promises 24×7 availability; the supplied list’s 24×7, equipment, clinician, procedure, test, and home-visit claims remain subject to confirmation.
- No analytics ID, Search Console token, review markup, or invented business-profile link is included.

## Page targeting and metadata

| Page                    | Proposed primary search intent                                | Title                                                                 | Description approach                                                                 |
| ----------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `/`                     | Multispeciality hospital in Kondhwa; hospital in Kondhwa Pune | `Elitecare Multispeciality Hospital \| Kondhwa, Pune`                 | Overview, services, home visits, location and contact; avoids unverified 24×7 claims |
| `/about/`               | Hospital information in Kondhwa, Pune                         | `About Elitecare Multispeciality Hospital \| Kondhwa, Pune`           | Hospital identity and owner-supplied information                                     |
| `/services/`            | Medical services in Kondhwa                                   | `Medical Services \| Elitecare Multispeciality Hospital`              | All 13 service categories and availability qualifiers                                |
| `/hospital/`            | Hospital photos in Kondhwa, Pune                              | `Hospital Photos \| Elitecare Multispeciality Hospital, Pune`         | Genuine supplied photographs and visible care areas                                  |
| `/home-visits/`         | Doctor home visits in Kondhwa                                 | `Doctor Home Visits \| Elitecare Multispeciality Hospital`            | Older/bedridden patient visit information, qualified by availability                 |
| `/contact/`             | Hospital phone, address and directions in Kondhwa             | `Contact & Location \| Elitecare Multispeciality Hospital`            | Supplied phone and Trimurti Building address                                         |
| `/patient-information/` | Patient information and website privacy                       | `Patient Information & Privacy \| Elitecare Multispeciality Hospital` | Emergency, medical-content, service availability and privacy notices                 |
| `/doctors/`             | No index target until verified profiles exist                 | `Doctors \| Elitecare Multispeciality Hospital`                       | `noindex, follow`; not included in the sitemap                                       |

The 13 approved categories remain together on `/services/` to avoid thin, repetitive pages. Local themes such as orthopedics, general physician, fever, pediatric consultation, ECG, diabetes, wound care, skin conditions, and geriatric home visits should be expanded into separate pages only when the hospital can provide distinct, accurate patient information and confirm availability.

## Google Business Profile checklist (owner action)

- [ ] Verify profile ownership and ensure authorized staff retain access.
- [ ] The owner confirmed the website’s public-facing name as `Elitecare Multispeciality Hospital`; match it against official hospital records and the profile before making external profile edits.
- [ ] Select the most accurate primary category and only relevant additional categories.
- [ ] Confirm the exact address and map pin in the profile; the website uses the address supplied by the owner but does not infer coordinates.
- [ ] Confirm phone number `9709700201`, website URL, and whether the number is also an official WhatsApp contact.
- [ ] Enter actual opening hours and separately verify any emergency availability before publishing it.
- [ ] Add only services and facilities the hospital currently provides.
- [ ] Upload genuine, current hospital photographs with appropriate consent and permissions.
- [ ] Publish accurate updates only when useful and current.
- [ ] Monitor profile calls, directions, website visits, and other available interactions.
- [ ] Invite all patients to leave honest feedback without incentives or satisfaction filtering. Respond professionally and never reveal patient information.
- [ ] Do not add location keywords to the profile business name or publish invented reviews, ratings, or credentials.

No Google Business Profile was accessed or edited as part of this code change.

## Search Console and measurement setup (owner action)

- [ ] Confirm the apex domain is controlled and deployed to the intended production website.
- [ ] Add `https://elitecaremultispecialityhospital.in/` as a Search Console Domain property (DNS verification requires domain-owner access).
- [ ] Submit `https://elitecaremultispecialityhospital.in/sitemap.xml`.
- [ ] Inspect the homepage and each canonical page; monitor indexing, crawl errors, and search performance.
- [ ] Use URL inspection after publishing material changes; indexing and ranking are controlled by Google and are not guaranteed.
- [ ] Provide an authorized GA4 measurement ID only if analytics is required and consent/privacy obligations are addressed. No tracking ID has been invented or installed.
- [ ] Never send patient names, phone numbers, symptoms, appointment details, or other health information to analytics.
- [ ] Review impressions, clicks, click-through rate, indexed pages, query themes, and average position carefully; measure calls only through an authorized, privacy-appropriate method.

## Ethical local authority plan

- Keep the same verified name, address, and phone on legitimate local and healthcare directories.
- Participate in genuine local health education or community partnerships and publish only clinically reviewed resources.
- Request honest feedback neutrally from all patients. Do not buy links, offer review incentives, filter requests, or disclose confidential information in public replies.
- Develop health guides only when a qualified reviewer can approve and maintain them; proposed topics include fever assessment, injury warning signs, blood-pressure monitoring, diabetes follow-up, falls prevention, and preparing for a home visit.
- Do not claim medical review, an author, a publication date, or a clinical outcome unless verified.

## Owner confirmation still required

- Current 24×7 emergency, orthopedician, and general physician coverage.
- Pediatric and dermatology clinician availability; ECG, monitoring, laboratory/testing, oxygen, and nebulization equipment and availability.
- Suturing, plaster/splint, minor procedure, and other availability-qualified services.
- Home visit coverage, scheduling, and current clinician availability.
- Opening hours, official WhatsApp contact, email, and any enquiry/appointment submission service.
- Verified doctor names, qualifications, registrations, and consent before adding profiles.
- Official logo and any approved image-use credits, if applicable.
- Confirmation that the public business name and address match hospital records and the Google Business Profile.

## Deployment and external validation status

The official domain was checked on 2026-10-23. Both apex and `www` returned HTTP 200, but the apex HTML was a Hostinger parked-domain page marked `noindex`; it was not this React website. The domain therefore has not been verified as connected to this Vercel project. DNS/domain ownership and the primary-host redirect must be configured by the domain owner before launch. HTTPS availability alone does not verify deployment.

The Vercel configuration in this repository has not been deployed or validated against a live Vercel project. Once deployed, verify direct loads and refreshes for every canonical route, confirm `/robots.txt` and `/sitemap.xml`, and check the apex/`www` and HTTP/HTTPS redirects. Google indexing, Search Console submission, Business Profile changes, real-user Core Web Vitals, and clinical review remain external actions.
