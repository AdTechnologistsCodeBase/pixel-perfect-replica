import { AlertTriangle, MapPin, Navigation, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { hospitalPhone, hospitalPhoneDisplay, seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1892.2822923927467!2d73.88683585183759!3d18.458068459722455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb6960b29243%3A0x8b4d48687ce6e36!2sElitecare%20Multispeciality%20Clinic!5e0!3m2!1sen!2sin!4v1792767158885!5m2!1sen!2sin";
const directionsUrl = mapEmbedUrl.replace("/embed?", "?output=classic&");

export function ContactPage() {
  usePageMetadata(seoPages.contact);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="site-enter mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Contact us</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Contact Us</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Elitecare Multispeciality Hospital, Kondhwa Main Road, Pune, Maharashtra.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="site-card site-enter site-enter-delay-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-blue-100 p-3 text-blue-800">
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
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-blue-800 underline underline-offset-4 hover:text-blue-900"
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
            <span className="rounded-2xl bg-blue-100 p-3 text-blue-800">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Call the hospital</h2>
              <a
                href={`tel:${hospitalPhone}`}
                className="mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-blue-800 underline underline-offset-4 hover:text-blue-900"
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

      <section
        aria-labelledby="map-heading"
        className="site-card mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-6 sm:p-8">
          <h2 id="map-heading" className="text-xl font-bold text-slate-900">
            Find Elitecare Multispeciality Clinic
          </h2>
          <p className="mt-2 text-slate-600">View the clinic’s location on Google Maps.</p>
        </div>
        <iframe
          src={mapEmbedUrl}
          title="Map showing Elitecare Multispeciality Clinic in Kondhwa, Pune"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block aspect-[4/3] w-full border-0 sm:aspect-[16/7]"
        />
      </section>

      <div className="site-card mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Looking for a service?</h2>
        <p className="mt-2 text-slate-600">
          Review the supplied medical services and their availability notes.
        </p>
        <Link
          to="/services/"
          className="site-button mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800"
        >
          Medical Services
        </Link>
      </div>
    </div>
  );
}
