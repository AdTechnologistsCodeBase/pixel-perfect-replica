import { Link } from "react-router-dom";

import { hospitalPhoneDisplay, seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function PatientInformationPage() {
  usePageMetadata(seoPages.patientInformation);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <header className="site-enter mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Patient information
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
          Medical information and website privacy
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Important information about service availability, urgent care, and how this website
          currently handles enquiries and analytics.
        </p>
      </header>

      <div className="space-y-6">
        <section className="site-card rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Medical information and emergencies</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Website content describes services supplied by the hospital and is general information,
            not a diagnosis, treatment plan, or substitute for advice from a qualified healthcare
            professional. Service availability depends on clinical assessment, staffing, equipment,
            and scheduling; call the hospital to confirm before making plans.
          </p>
          <p className="mt-4 leading-7 text-slate-700">
            If someone may be experiencing a life-threatening emergency, seek local emergency
            assistance immediately. Do not wait for a website response or a routine appointment.
          </p>
        </section>

        <section className="site-card rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Website privacy</h2>
          <p className="mt-4 leading-7 text-slate-700">
            This website currently has no appointment or enquiry form and does not load analytics or
            advertising tags. The hosting provider may process technical request information to
            deliver and protect the website; its current retention and privacy terms should be
            confirmed by the hospital owner.
          </p>
          <p className="mt-4 leading-7 text-slate-700">
            If you use the phone link, your call is made through your device and telephone provider;
            the website does not receive call details. The directions link opens Google Maps, which
            is governed by Google’s own privacy terms.
          </p>
        </section>

        <section className="site-card rounded-3xl border border-emerald-200 bg-emerald-50 p-7 md:p-8">
          <h2 className="text-xl font-bold text-emerald-950">Contact and location</h2>
          <p className="mt-3 leading-7 text-emerald-950">
            Call {hospitalPhoneDisplay} or view the hospital address and directions on the contact
            page.
          </p>
          <Link
            to="/contact/"
            className="site-button mt-5 inline-flex min-h-11 items-center rounded-full bg-emerald-800 px-5 py-2.5 font-semibold text-white hover:bg-emerald-900"
          >
            Contact the hospital
          </Link>
        </section>
      </div>
    </div>
  );
}
