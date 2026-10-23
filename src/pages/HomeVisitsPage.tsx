import { ArrowRight, HandHeart } from "lucide-react";

import { medicalServices } from "@/data/medicalServices";
import { hospitalPhone, seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const homeVisitService = medicalServices.find(
  (service) => service.id === "geriatric-care-doctor-home-visits",
);

export function HomeVisitsPage() {
  usePageMetadata(seoPages.homeVisits);

  if (!homeVisitService) {
    throw new Error("The geriatric and home visit service content is missing.");
  }

  return (
    <div className="bg-slate-50">
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_auto] md:py-20">
          <div className="site-enter">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
              Kondhwa and nearby areas of Pune
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
              Doctor Home Visits for Senior Citizens &amp; Bedridden Patients
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50">
              Medical consultation and follow-up for elderly and bedridden patients in Kondhwa and
              nearby areas of Pune, subject to appointment and doctor availability.
            </p>
            <a
              href={`tel:${hospitalPhone}`}
              className="site-button mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Call to Ask About Home Visits <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <span className="site-enter site-enter-delay-1 hidden h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-emerald-200 md:flex">
            <HandHeart className="h-12 w-12" aria-hidden="true" />
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Home visit services
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">
            Care at home, subject to availability
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            The following home visit and geriatric care services were supplied by the hospital.
            Contact the hospital to confirm appointment and doctor availability before making plans.
          </p>
        </div>
        <div className="site-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {homeVisitService.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                  ✓
                </span>
                <span className="leading-6">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 rounded-2xl bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
            <strong>Service area and availability:</strong> Service availability in Kondhwa and
            nearby areas of Pune, subject to appointment and doctor availability.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Call the hospital to ask about home visits and confirm appointment and doctor
            availability. This website does not accept online enquiries.
          </p>
          <a
            href={`tel:${hospitalPhone}`}
            className="site-button mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Call to Ask About Home Visits <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
