import {
  ArrowRight,
  HeartPulse,
  House,
  Stethoscope,
  Syringe,
  Activity,
  Bone,
  Baby,
  Thermometer,
  ClipboardList,
  ShieldCheck,
  ScanHeart,
  Bandage,
  Wind,
  Microscope,
  CalendarCheck,
  HandHeart,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { seoPages } from "@/data/siteSeo";
import { hospitalExteriorImage, hospitalReceptionImage } from "@/data/hospitalImages";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const serviceHighlights: { title: string; icon: LucideIcon }[] = [
  { title: "Emergency & Trauma Care", icon: HeartPulse },
  { title: "Orthopedic Services", icon: Bone },
  { title: "General Physician Services", icon: Stethoscope },
  { title: "Infectious & Febrile Illnesses", icon: Thermometer },
  { title: "Pediatric Services", icon: Baby },
  { title: "Cardiac & Chest Pain Services", icon: ScanHeart },
  { title: "Diabetes & Hypertension Management", icon: Activity },
  { title: "Minor Procedures & Wound Care", icon: Bandage },
  { title: "Respiratory & General Medical Care", icon: Wind },
  { title: "Investigations & Monitoring", icon: Microscope },
  { title: "Preventive & Follow-up Care", icon: CalendarCheck },
  { title: "Dermatology & Skin Diseases", icon: Syringe },
  { title: "Geriatric Care & Doctor Home Visits", icon: HandHeart },
];

export function HomePage() {
  usePageMetadata(seoPages.home);

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Elitecare Multispeciality Hospital · Kondhwa, Pune
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Medical Services in Kondhwa, Pune
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Medical assistance for emergency and trauma concerns, general medical conditions,
              orthopedic complaints, pediatric consultation, skin diseases, and home visits for
              senior citizens and bedridden patients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services/"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Explore Medical Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact/"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-emerald-700"
              >
                Location &amp; Contact
              </Link>
            </div>
            <p className="mt-6 text-sm font-semibold text-emerald-900">
              Your Health. Our Priority.
            </p>
          </div>

          <Link
            to="/hospital/"
            aria-label="View Elitecare Hospital photographs"
            className="group relative block overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.14)]"
          >
            <img
              src={hospitalExteriorImage.src}
              srcSet={hospitalExteriorImage.srcSet}
              sizes={hospitalExteriorImage.sizes}
              alt={hospitalExteriorImage.alt}
              width={hospitalExteriorImage.width}
              height={hospitalExteriorImage.height}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover object-center transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow">
              Our hospital in Kondhwa
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
              Emergency care
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Emergency &amp; Trauma Care</h2>
            <p className="mt-3 max-w-3xl leading-7 text-emerald-50">
              Supplied information lists trauma assessment, wound management, initial stabilization,
              and emergency referral. Confirm current staffing and service availability with the
              hospital.
            </p>
          </div>
          <Link
            to="/services/#emergency-trauma-care"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-300 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
          >
            Emergency service details <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sm leading-6 text-emerald-100 md:col-span-2">
            The supplied service list includes emergency and trauma care; staffing and availability
            must be confirmed with the hospital. For life-threatening symptoms, seek emergency
            assistance immediately from local emergency services.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Medical services
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            Care and consultation in one place
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Explore the services provided by Elitecare Multispeciality Hospital.
            Availability-specific details are noted on the complete services page.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceHighlights.map(({ title, icon: Icon }) => (
            <Link
              key={title}
              to={`/services/#${title
                .toLowerCase()
                .replaceAll(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-semibold leading-6 text-slate-800">{title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services/"
            className="font-semibold text-emerald-800 underline underline-offset-4"
          >
            View all service details
          </Link>
        </div>
      </section>

      <section className="bg-sky-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
          <div className="order-2 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm md:order-1">
            <img
              src={hospitalReceptionImage.src}
              srcSet={hospitalReceptionImage.srcSet}
              sizes={hospitalReceptionImage.sizes}
              alt="Reception area at Elitecare Multispeciality Hospital"
              width={hospitalReceptionImage.width}
              height={hospitalReceptionImage.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="mb-4 inline-flex rounded-full bg-white p-3 text-emerald-700 shadow-sm">
              <House className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Home visit services
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              Home Visit Services for Senior Citizens and Bedridden Patients
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Medical consultation and follow-up for elderly and bedridden patients in Kondhwa and
              nearby areas of Pune, subject to appointment and doctor availability.
            </p>
            <Link
              to="/home-visits/"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Home Visit Information <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Our hospital
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">A closer look at Elitecare</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Take a closer look at Elitecare Multispeciality Hospital and our care environment in
              Kondhwa, Pune.
            </p>
          </div>
          <Link
            to="/hospital/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-700 px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Visit Our Hospital <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
