import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { hospitalPhone, hospitalPhoneDisplay } from "@/data/siteSeo";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about/", label: "About Us" },
  { to: "/services/", label: "Medical Services" },
  { to: "/hospital/", label: "Our Hospital" },
  { to: "/home-visits/", label: "Home Visits" },
  { to: "/contact/", label: "Contact Us" },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `min-h-11 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-emerald-50 text-emerald-800"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-h-12 items-center gap-3" aria-label="Elitecare home">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
              E
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900">ELITECARE</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Multispeciality Hospital
              </div>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={"end" in item ? item.end : false}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${hospitalPhone}`}
              aria-label="Call Elitecare Multispeciality Hospital"
              className="site-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:px-4"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Call</span>
            </a>
            <Link
              to="/contact/"
              className="site-button hidden min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:inline-flex"
            >
              Contact <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!mobileMenuOpen}
          className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={"end" in item ? item.end : false}
                className={navClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-lg font-bold text-emerald-300">
                E
              </div>
              <div>
                <div className="text-lg font-extrabold text-white">ELITECARE</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">
                  Multispeciality Hospital
                </div>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-300">Your Health. Our Priority.</p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Location
            </h2>
            <address className="text-sm not-italic leading-7 text-slate-300">
              Shop No. 1/2/3/4, Trimurti Building
              <br />
              Near Crown Bakery, Kondhwa Main Road
              <br />
              Kondhwa BK, Pune - 411048, Maharashtra, India
            </address>
            <a
              href={`tel:${hospitalPhone}`}
              className="mt-3 inline-flex min-h-9 items-center py-1 text-sm font-semibold text-emerald-300 hover:text-white"
            >
              {hospitalPhoneDisplay}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Quick Links
            </h2>
            <div className="flex flex-col items-start gap-2 text-sm text-slate-300">
              <Link to="/services/" className="min-h-9 py-1 hover:text-white">
                Medical Services
              </Link>
              <Link to="/hospital/" className="min-h-9 py-1 hover:text-white">
                Our Hospital
              </Link>
              <Link to="/home-visits/" className="min-h-9 py-1 hover:text-white">
                Home Visits
              </Link>
              <Link to="/doctors/" className="min-h-9 py-1 hover:text-white">
                Our Doctors
              </Link>
              <Link to="/contact/" className="min-h-9 py-1 hover:text-white">
                Contact Us
              </Link>
              <Link to="/patient-information/" className="min-h-9 py-1 hover:text-white">
                Patient Information & Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Elitecare Multispeciality Hospital</span>
            <span>Your Health. Our Priority.</span>
            <span>
              Website built by{" "}
              <a
                href="https://www.vtechnex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-300 underline-offset-4 transition hover:text-white hover:underline"
              >
                Vtechnex
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
