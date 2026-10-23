import { seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function DoctorsPage() {
  usePageMetadata(seoPages.doctors);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Doctors</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Doctor profiles</h1>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
        Verified doctor names, qualifications, and specialties were not available in the supplied
        project. Add approved profiles here before publication.
      </div>
    </div>
  );
}
