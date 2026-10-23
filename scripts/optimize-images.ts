import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDirectory = path.join(root, "src", "assets", "hospital-photo-sources");
const publicDirectory = path.join(root, "public");
const imageDirectory = path.join(publicDirectory, "images");

const photos = [
  { source: "hospitalfrontimages.webp", name: "hospital-exterior", width: 1360 },
  { source: "reception-image.jpeg", name: "hospital-reception", width: 720 },
  { source: "cabin-image.jpeg", name: "consultation-room", width: 960 },
  { source: "fullbeds-image.jpeg", name: "patient-ward", width: 720 },
  { source: "bedside-image.jpeg", name: "bedside-treatment-room", width: 720 },
  { source: "bedfront-image.jpeg", name: "hospital-treatment-room", width: 720 },
] as const;

await mkdir(imageDirectory, { recursive: true });

for (const photo of photos) {
  const input = path.join(sourceDirectory, photo.source);
  const metadata = await sharp(input).metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
  if (!sourceWidth || !metadata.height) {
    throw new Error(`Could not read image dimensions: ${input}`);
  }

  const responsiveWidths = photo.width > 1024 ? [480, 768, 1024] : [360, 480, 640];
  const widths = [...responsiveWidths, photo.width].filter(
    (width, index, values) => width <= sourceWidth && values.indexOf(width) === index,
  );

  for (const width of widths) {
    const output = path.join(imageDirectory, `${photo.name}-${width}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5, smartSubsample: true })
      .toFile(output);
  }
}

const logoPath = path.join(root, "src", "assets", "elitecare-logo.png");
const faviconBuffer = await sharp(logoPath)
  .rotate()
  .resize(512, 512, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();

for (const size of [32, 192, 180]) {
  const filename = size === 180 ? "apple-touch-icon.png" : `favicon-${size}x${size}.png`;
  await sharp(faviconBuffer)
    .resize(size, size)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(publicDirectory, filename));
}
