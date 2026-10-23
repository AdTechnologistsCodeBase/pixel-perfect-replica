import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seoPages } from "@/data/siteSeo";

export function AboutPage() {
  usePageMetadata(seoPages.about);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          About us
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
          Elitecare Multispeciality Hospital
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Your Health. Our Priority. Serving Kondhwa, Pune, Maharashtra.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Hospital information</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Elitecare Multispeciality Hospital is located in Kondhwa, Pune, Maharashtra. The
            hospital information on this website is based on details supplied by the owner.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-8 shadow-sm">
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
