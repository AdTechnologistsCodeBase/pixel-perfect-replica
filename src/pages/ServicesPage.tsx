import { ArrowRight, HeartPulse, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

import { medicalServices } from "@/data/medicalServices";
import { seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function ServicesPage() {
  usePageMetadata(seoPages.services);

  return (
    <div className="bg-slate-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Elitecare Multispeciality Hospital · Kondhwa, Pune
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Medical Services
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Explore the hospital’s supplied list of medical services and consultation areas. Actual
            availability can depend on clinical assessment, equipment, staffing, and scheduling.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/contact/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              Contact the hospital <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/home-visits/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-emerald-700"
            >
              Home visit services
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr] lg:py-14">
        <nav
          aria-label="Medical services contents"
          className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-500">
            On this page
          </h2>
          <ol className="space-y-2">
            {medicalServices.map((service, index) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="flex gap-2 rounded-lg px-2 py-1.5 text-sm leading-5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <span className="shrink-0 text-emerald-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <div className="flex gap-3">
              <HeartPulse className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-bold">Emergency information</h2>
                <p className="mt-1 text-sm leading-6">
                  The hospital-provided service list describes emergency and trauma care. Emergency
                  staffing and service availability require hospital confirmation before
                  publication. For suspected heart attack, severe breathing difficulty, major
                  trauma, or other life-threatening symptoms, seek emergency assistance immediately
                  from local emergency services.
                </p>
              </div>
            </div>
          </section>

          <div className="space-y-5">
            {medicalServices.map((service, index) => (
              <section
                id={service.id}
                key={service.id}
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                      {service.title}
                    </h2>
                    <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm leading-6 text-slate-700"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {service.availabilityNote && (
                      <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                        <strong>Availability note:</strong> {service.availabilityNote}
                      </p>
                    )}
                    {service.id === "geriatric-care-doctor-home-visits" && (
                      <Link
                        to="/home-visits/"
                        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                      >
                        Home Visit Details <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-emerald-950 p-6 text-white md:p-8">
            <h2 className="text-xl font-bold">Need to contact the hospital?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
              Call the hospital to confirm current service availability. An email contact is not
              currently available through this website.
            </p>
            <Link
              to="/contact/"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" /> Contact details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
