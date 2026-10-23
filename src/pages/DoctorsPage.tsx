import { seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function DoctorsPage() {
  usePageMetadata(seoPages.doctors);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="site-enter mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Doctors</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Meet our doctors</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Elitecare Multispeciality Clinic provides quality, affordable, and patient-centered
          healthcare for all age groups. Our doctors are committed to ethical medical practice and
          compassionate care.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="site-card site-enter site-enter-delay-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Doctor
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Dr. Arbaaz Shakil Khan
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Qualification
          </p>
          <p className="mt-1 text-lg font-medium text-slate-700">M.B.B.S.</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Institution
          </p>
          <p className="mt-1 leading-7 text-slate-600">HBTMC Mumbai · Dr. R.N. Cooper Hospital</p>
        </article>

        <article className="site-card site-enter site-enter-delay-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Doctor
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Dr. Akeel Shakil Khan
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Qualification
          </p>
          <p className="mt-1 text-lg font-medium text-slate-700">M.D. (Mumbai)</p>
        </article>
      </div>

      <p className="mt-8 text-base font-semibold text-emerald-800">Your Health, Our Priority.</p>
      <p className="mt-2 max-w-3xl leading-7 text-slate-600">
        The clinic also offers consultation, diagnosis, treatment, preventive care, health
        check-ups, vaccinations, and minor procedures. Please contact the clinic to confirm
        appointments and service availability.
      </p>
    </div>
  );
}
