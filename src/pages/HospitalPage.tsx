import { useEffect, useRef, useState } from "react";

import { hospitalImages } from "@/data/hospitalImages";
import { seoPages } from "@/data/siteSeo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function HospitalPage() {
  usePageMetadata(seoPages.hospital);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const selectedPhoto = selectedImage === null ? null : hospitalImages[selectedImage];

  if (selectedImage !== null && !selectedPhoto) {
    throw new RangeError(`Hospital photo index ${selectedImage} is out of range.`);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedImage !== null && !dialog.open) {
      dialog.showModal();
    } else if (selectedImage === null && dialog.open) {
      dialog.close();
    }
  }, [selectedImage]);

  const closeLightbox = () => setSelectedImage(null);
  const moveSelection = (direction: -1 | 1) => {
    setSelectedImage((current) => {
      if (current === null) return current;
      return (current + direction + hospitalImages.length) % hospitalImages.length;
    });
  };

  return (
    <div className="bg-slate-50">
      <section className="bg-white">
        <div className="site-enter mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Elitecare Multispeciality Hospital · Kondhwa, Pune
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Our Hospital
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Take a closer look at Elitecare Multispeciality Hospital and our care environment in
            Kondhwa, Pune.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14" aria-label="Hospital photographs">
        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-3">
          {hospitalImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Open photo: ${image.alt}`}
              className={`site-card group relative min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${
                index === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent px-4 pb-4 pt-12 text-sm font-medium text-white">
                {image.alt}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <p className="text-sm leading-6 text-slate-600">
          Photographs supplied with the project. Captions describe visible contents only.
        </p>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="hospital-photo-title"
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onClose={closeLightbox}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") moveSelection(-1);
          if (event.key === "ArrowRight") moveSelection(1);
        }}
        className="m-auto max-h-[92dvh] max-w-[min(94vw,70rem)] overflow-hidden rounded-2xl border-0 bg-slate-950 p-0 text-white shadow-2xl backdrop:bg-slate-950/80"
      >
        {selectedPhoto && (
          <div className="relative flex max-h-[92dvh] flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <h2 id="hospital-photo-title" className="text-sm font-medium">
                Photo {hospitalImages.findIndex((image) => image.src === selectedPhoto.src) + 1} of{" "}
                {hospitalImages.length}
              </h2>
              <button
                type="button"
                autoFocus
                onClick={closeLightbox}
                className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Close
              </button>
            </div>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              className="max-h-[calc(92dvh-6rem)] max-w-[94vw] object-contain"
            />
            <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <button
                type="button"
                onClick={() => moveSelection(-1)}
                className="rounded-lg px-3 py-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous photo"
              >
                Previous
              </button>
              <p className="text-center text-slate-200">{selectedPhoto.alt}</p>
              <button
                type="button"
                onClick={() => moveSelection(1)}
                className="rounded-lg px-3 py-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next photo"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
