export type HospitalImage = {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
};

function createHospitalImage(
  filename: string,
  alt: string,
  width: number,
  height: number,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
): HospitalImage {
  const responsiveWidths = width > 1024 ? [480, 768, 1024] : [360, 480, 640];
  const widths = [...responsiveWidths, width].filter(
    (candidate, index, candidates) => candidate <= width && candidates.indexOf(candidate) === index,
  );

  return {
    src: `/images/${filename}-${width}.webp`,
    srcSet: widths
      .map((candidate) => `/images/${filename}-${candidate}.webp ${candidate}w`)
      .join(", "),
    sizes,
    alt,
    width,
    height,
  };
}

export const hospitalExteriorImage = createHospitalImage(
  "hospital-exterior",
  "Exterior entrance and signage of Elitecare Multispeciality Hospital",
  1360,
  765,
  "(min-width: 1024px) 45vw, 100vw",
);

export const hospitalReceptionImage = createHospitalImage(
  "hospital-reception",
  "Reception counter and entrance inside Elitecare Multispeciality Hospital",
  720,
  1280,
  "(min-width: 768px) 50vw, 100vw",
);

export const hospitalImages: readonly HospitalImage[] = [
  hospitalExteriorImage,
  hospitalReceptionImage,
  createHospitalImage(
    "consultation-room",
    "Consultation room with desk, examination couch, and displayed certificates",
    960,
    1280,
  ),
  createHospitalImage("patient-ward", "Several patient beds in a hospital room", 720, 1280),
  createHospitalImage(
    "bedside-treatment-room",
    "Treatment area with a patient bed, monitor, and privacy curtain",
    720,
    1280,
  ),
  createHospitalImage(
    "hospital-treatment-room",
    "Hospital treatment room with beds and privacy screens",
    720,
    1280,
  ),
];
