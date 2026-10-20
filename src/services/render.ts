import type { CanvasElement, Easing, Project } from "@/types";
import { clamp } from "@/utils";

const ease: Record<Easing, (t: number) => number> = {
  linear: (t) => t,
  "ease-in": (t) => t * t * t,
  "ease-out": (t) => 1 - (1 - t) ** 3,
  "ease-in-out": (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
};

export interface RenderState {
  visible: boolean;
  dx: number;
  dy: number;
  scale: number;
  opacity: number;
}

/** Computes an element's animated state at time t (seconds). */
export function elementStateAt(project: Project, el: CanvasElement, t: number | null): RenderState {
  const base: RenderState = { visible: true, dx: 0, dy: 0, scale: 1, opacity: el.opacity };
  if (t === null) return base;
  const clip = project.clips.find((c) => c.elementId === el.id);
  if (clip && (t < clip.start || t > clip.start + clip.duration)) return { ...base, visible: false };
  const a = el.animation;
  if (a.preset === "none" || !clip) return base;
  const isExit = a.preset === "fade-out";
  const animStart = isExit ? clip.start + clip.duration - a.duration - a.offset : clip.start + a.offset;
  const raw = clamp((t - animStart) / Math.max(0.05, a.duration), 0, 1);
  const p = ease[a.easing](raw);
  const dist = project.height * 0.08;
  switch (a.preset) {
    case "fade-in": return { ...base, opacity: el.opacity * p };
    case "fade-out": return { ...base, opacity: el.opacity * (1 - p) };
    case "slide-up": return { ...base, dy: (1 - p) * dist, opacity: el.opacity * p };
    case "slide-left": return { ...base, dx: (1 - p) * dist * 1.5, opacity: el.opacity * p };
    case "scale-in": return { ...base, scale: 0.6 + 0.4 * p, opacity: el.opacity * p };
    case "move-right": return { ...base, dx: p * project.width * 0.15 };
    default: return base;
  }
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Serialises the current frame to standalone SVG markup (images omitted unless same-origin). */
export function projectToSvg(project: Project, t: number | null): string {
  const parts = project.elements.map((el) => {
    const st = elementStateAt(project, el, t);
    if (!st.visible) return "";
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;
    const tr = `translate(${st.dx} ${st.dy}) rotate(${el.rotation} ${cx} ${cy}) translate(${cx} ${cy}) scale(${st.scale}) translate(${-cx} ${-cy})`;
    const op = st.opacity.toFixed(3);
    if (el.kind === "rect") return `<rect transform="${tr}" opacity="${op}" x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" rx="${el.radius ?? 0}" fill="${el.fill}"/>`;
    if (el.kind === "ellipse") return `<ellipse transform="${tr}" opacity="${op}" cx="${cx}" cy="${cy}" rx="${el.width / 2}" ry="${el.height / 2}" fill="${el.fill}"/>`;
    if (el.kind === "text") {
      const anchor = el.align === "center" ? "middle" : el.align === "right" ? "end" : "start";
      const tx = el.align === "center" ? cx : el.align === "right" ? el.x + el.width : el.x;
      return `<text transform="${tr}" opacity="${op}" x="${tx}" y="${el.y + (el.fontSize ?? 48)}" fill="${el.fill}" font-family="Manrope, sans-serif" font-weight="${el.fontWeight ?? 600}" font-size="${el.fontSize ?? 48}" text-anchor="${anchor}">${esc(el.text ?? "")}</text>`;
    }
    return `<rect transform="${tr}" opacity="${op}" x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" fill="#333"/>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${project.width}" height="${project.height}" viewBox="0 0 ${project.width} ${project.height}"><rect width="100%" height="100%" fill="${project.background}"/>${parts.join("")}</svg>`;
}

export async function exportFrame(project: Project, t: number | null, format: "png" | "jpeg", scale: number): Promise<void> {
  const svg = projectToSvg(project, t);
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    await new Promise<void>((res, rej) => {
      image.onload = () => res();
      image.onerror = () => rej(new Error("Could not rasterise frame"));
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = project.width * scale;
    canvas.height = project.height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const a = document.createElement("a");
    a.href = canvas.toDataURL(`image/${format}`, 0.92);
    a.download = `${project.name.replace(/\s+/g, "_")}.${format === "jpeg" ? "jpg" : "png"}`;
    a.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}
