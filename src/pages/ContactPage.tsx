import { AlertTriangle, MapPin, Navigation, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { hospitalPhone, hospitalPhoneDisplay, seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Shop No. 1/2/3/4, Trimurti Building, Near Crown Bakery, Kondhwa Main Road, Kondhwa BK, Pune 411048",
)}`;

export function ContactPage() {
  usePageMetadata(seoPages.contact);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="site-enter mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Contact us
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Contact Us</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Elitecare Multispeciality Hospital, Kondhwa Main Road, Pune, Maharashtra.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="site-card site-enter site-enter-delay-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-emerald-100 p-3 text-emerald-800">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hospital location</h2>
              <address className="mt-2 not-italic leading-7 text-slate-600">
                Shop No. 1/2/3/4, Trimurti Building
                <br />
                Near Crown Bakery, Kondhwa Main Road
                <br />
                Kondhwa BK, Pune - 411048, Maharashtra, India
              </address>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>
          <p className="mt-6 leading-7 text-slate-600">
            Email contact is not currently available through this website.
          </p>
          <div className="mt-6 flex items-start gap-4">
            <span className="rounded-2xl bg-emerald-100 p-3 text-emerald-800">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Call the hospital</h2>
              <a
                href={`tel:${hospitalPhone}`}
                className="mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
              >
                {hospitalPhoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <aside className="site-card site-enter site-enter-delay-2 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-950 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold">Emergency notice</h2>
              <p className="mt-3 leading-7">
                For suspected heart attack, severe breathing difficulty, major trauma, or another
                life-threatening emergency, seek emergency assistance immediately from local
                emergency services. The hospital phone number is for contacting the hospital and is
                not a substitute for emergency services.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="site-card mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Looking for a service?</h2>
        <p className="mt-2 text-slate-600">
          Review the supplied medical services and their availability notes.
        </p>
        <Link
          to="/services/"
          className="site-button mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
        >
          Medical Services
        </Link>
      </div>
    </div>
  );
}
