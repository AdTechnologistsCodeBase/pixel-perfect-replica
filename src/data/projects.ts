import type { CanvasElement, Clip, Project, ProjectType, Track } from "@/types";
import { img, uid } from "@/utils";

export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  video: "Video Editing",
  motion: "Motion Graphics",
  graphic: "Graphic Design",
  reel: "Social Media Reel",
  custom: "Custom Canvas",
};

const anim = (preset: CanvasElement["animation"]["preset"] = "none", duration = 0.8): CanvasElement["animation"] => ({
  preset,
  offset: 0,
  duration,
  easing: "ease-out",
});

export function defaultTracks(): Track[] {
  return [
    { id: uid("trk"), name: "Text", kind: "text" },
    { id: uid("trk"), name: "Graphics", kind: "shape" },
    { id: uid("trk"), name: "Video", kind: "video" },
    { id: uid("trk"), name: "Audio", kind: "audio" },
  ];
}

interface Seed {
  name: string;
  type: ProjectType;
  status: Project["status"];
  w: number;
  h: number;
  bg: string;
  thumb: string;
  title: string;
  sub: string;
  accent: string;
  hoursAgo: number;
}

function build(s: Seed): Project {
  const tracks = defaultTracks();
  const [tText, tGfx, tVid, tAud] = tracks;
  const scale = s.w / 1920;
  const bar: CanvasElement = {
    id: uid("el"), kind: "rect", name: "Accent Bar",
    x: 160 * scale, y: s.h * 0.62, width: 260 * scale, height: 10 * scale,
    rotation: 0, opacity: 1, fill: s.accent, radius: 4, animation: anim("slide-left", 0.6),
  };
  const title: CanvasElement = {
    id: uid("el"), kind: "text", name: "Title",
    x: 160 * scale, y: s.h * 0.38, width: s.w * 0.7, height: 140 * scale,
    rotation: 0, opacity: 1, fill: "#ffffff", text: s.title, fontSize: Math.round(110 * scale),
    fontWeight: 800, align: "left", animation: anim("slide-up", 0.9),
  };
  const sub: CanvasElement = {
    id: uid("el"), kind: "text", name: "Subtitle",
    x: 160 * scale, y: s.h * 0.66, width: s.w * 0.6, height: 60 * scale,
    rotation: 0, opacity: 0.8, fill: "#c9cdd6", text: s.sub, fontSize: Math.round(40 * scale),
    fontWeight: 500, align: "left", animation: anim("fade-in", 1.2),
  };
  const orb: CanvasElement = {
    id: uid("el"), kind: "ellipse", name: "Glow Orb",
    x: s.w * 0.68, y: s.h * 0.12, width: 420 * scale, height: 420 * scale,
    rotation: 0, opacity: 0.35, fill: s.accent, animation: anim("scale-in", 1.4),
  };
  const elements = [orb, bar, title, sub];
  const clips: Clip[] = [
    { id: uid("clp"), trackId: tText.id, name: "Title", kind: "text", start: 0.4, duration: 5.5, elementId: title.id },
    { id: uid("clp"), trackId: tText.id, name: "Subtitle", kind: "text", start: 1.2, duration: 4.8, elementId: sub.id },
    { id: uid("clp"), trackId: tGfx.id, name: "Accent Bar", kind: "shape", start: 0.8, duration: 5.2, elementId: bar.id },
    { id: uid("clp"), trackId: tGfx.id, name: "Glow Orb", kind: "shape", start: 0, duration: 7, elementId: orb.id },
    { id: uid("clp"), trackId: tVid.id, name: "B-roll_city.mp4", kind: "video", start: 0, duration: 4 },
    { id: uid("clp"), trackId: tVid.id, name: "Drone_coast.mp4", kind: "video", start: 4, duration: 4 },
    { id: uid("clp"), trackId: tAud.id, name: "Ambient_pad.wav", kind: "audio", start: 0, duration: 8 },
  ];
  const t = Date.now() - s.hoursAgo * 3600_000;
  return {
    id: uid("prj"), name: s.name, type: s.type, status: s.status, width: s.w, height: s.h,
    fps: s.type === "graphic" ? 0 : 30, background: s.bg, thumbnail: s.thumb,
    createdAt: t - 86400_000 * 3, updatedAt: t, duration: 10, elements, tracks, clips,
  };
}

export function seedProjects(): Project[] {
  return [
    build({ name: "Cinematic Motion Intro", type: "motion", status: "in-progress", w: 1920, h: 1080, bg: "#0d1017", thumb: img("photo-1478720568477-152d9b164e26"), title: "NORTHBOUND", sub: "A film by the studio", accent: "#4f8cff", hoursAgo: 2 }),
    build({ name: "Product Advertisement", type: "video", status: "review", w: 1920, h: 1080, bg: "#111111", thumb: img("photo-1505740420928-5e560c06d30e"), title: "Sound, refined.", sub: "Studio Wireless — 40h battery", accent: "#f2b84b", hoursAgo: 20 }),
    build({ name: "Social Media Reel", type: "reel", status: "draft", w: 1080, h: 1920, bg: "#15121c", thumb: img("photo-1611162617474-5b21e879e113"), title: "3 edits in 30s", sub: "Save for later", accent: "#ff5a7a", hoursAgo: 30 }),
    build({ name: "Brand Identity Animation", type: "motion", status: "in-progress", w: 1920, h: 1080, bg: "#0b1512", thumb: img("photo-1558655146-9f40138edfeb"), title: "Verdant", sub: "Brand system 2026", accent: "#3fd29a", hoursAgo: 52 }),
    build({ name: "Travel Film", type: "video", status: "complete", w: 3840, h: 2160, bg: "#0e1116", thumb: img("photo-1488646953014-85cb44e25828"), title: "Ten Days in Lisbon", sub: "Travel diary — Vol. 2", accent: "#ff8a3d", hoursAgo: 120 }),
    build({ name: "Typography Experiment", type: "graphic", status: "draft", w: 1080, h: 1350, bg: "#f4f1ea", thumb: img("photo-1561070791-2526d30994b5"), title: "Kinetic Type", sub: "Study no. 07", accent: "#1d1d1f", hoursAgo: 200 }),
  ];
}

export function blankProject(opts: { name: string; type: ProjectType; width: number; height: number; fps: number; background: string }): Project {
  const now = Date.now();
  const tracks = defaultTracks();
  const title: CanvasElement = {
    id: uid("el"), kind: "text", name: "Title", x: opts.width * 0.1, y: opts.height * 0.42,
    width: opts.width * 0.8, height: opts.height * 0.12, rotation: 0, opacity: 1, fill: "#ffffff",
    text: opts.name, fontSize: Math.round(Math.min(opts.width, opts.height) * 0.08), fontWeight: 700, align: "center",
    animation: { preset: "fade-in", offset: 0, duration: 0.8, easing: "ease-out" },
  };
  return {
    id: uid("prj"), name: opts.name, type: opts.type, status: "draft", width: opts.width, height: opts.height,
    fps: opts.fps, background: opts.background, thumbnail: img("photo-1557672172-298e090bd0f1"),
    createdAt: now, updatedAt: now, duration: 10, elements: [title], tracks,
    clips: [{ id: uid("clp"), trackId: tracks[0].id, name: "Title", kind: "text", start: 0, duration: 5, elementId: title.id }],
  };
}
