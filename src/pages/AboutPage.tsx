import { Link } from "react-router-dom";

import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seoPages } from "@/data/siteSeo";

export function AboutPage() {
  usePageMetadata(seoPages.about);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="site-enter mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">About us</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
          Elitecare Multispeciality Hospital
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Your Health, Our Priority. Serving Kondhwa, Pune, Maharashtra.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="site-card site-enter site-enter-delay-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Our commitment to your care</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Elitecare Multispeciality Clinic provides quality, affordable, and patient-centered
            healthcare for all age groups. We offer consultation, diagnosis, treatment, preventive
            care, health check-ups, vaccinations, and minor procedures with a commitment to ethical
            medical practice and compassionate care.
          </p>
          <Link
            to="/doctors/"
            className="site-button mt-6 inline-flex min-h-11 items-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Meet our doctors
          </Link>
        </div>

        <div className="site-card site-enter site-enter-delay-2 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 to-sky-50 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Services and availability</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            See the Medical Services page for the supplied service list. Availability-dependent
            services and appointments must be confirmed directly with the hospital.
          </p>
        </div>
      </div>
    </div>
  );
}
