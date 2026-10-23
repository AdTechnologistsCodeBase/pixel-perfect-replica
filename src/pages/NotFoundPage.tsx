import { Link } from "react-router-dom";

import { seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function NotFoundPage() {
  usePageMetadata(seoPages.notFound);

  return (
    <div className="site-enter mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl font-black text-blue-600">404</div>
      <h1 className="mt-4 text-3xl font-black text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        The page you are looking for may have moved or no longer exists.
      </p>
      <Link
        to="/"
        className="site-button mt-8 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Go to homepage
      </Link>
    </div>
  );
}
