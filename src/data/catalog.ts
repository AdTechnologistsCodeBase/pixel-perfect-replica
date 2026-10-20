import type { Collection, Conversation, InspirationRef, MediaAsset, PluginDef } from "@/types";
import { img } from "@/utils";

export const INSPIRATION_CATEGORIES = [
  "Motion Graphics", "Cinematic Color Grading", "Typography", "Brand Design", "UI Design",
  "Product Advertisements", "Transitions", "Visual Effects", "Video Editing", "Creative Campaigns",
];

export const EXTERNAL_SOURCES = [
  { name: "Web Search", url: "https://www.google.com/search?q=motion+design+inspiration" },
  { name: "Pinterest", url: "https://www.pinterest.com/search/pins/?q=motion%20graphics" },
  { name: "Behance", url: "https://www.behance.net/search/projects?search=motion" },
  { name: "Dribbble", url: "https://dribbble.com/search/motion" },
  { name: "YouTube", url: "https://www.youtube.com/results?search_query=motion+design" },
  { name: "Vimeo", url: "https://vimeo.com/search?q=motion%20graphics" },
  { name: "Unsplash", url: "https://unsplash.com" },
  { name: "Pexels", url: "https://www.pexels.com" },
];

export const seedCollections = (): Collection[] => [
  { id: "col_title", name: "Title Sequences" },
  { id: "col_grade", name: "Color Moods" },
  { id: "col_brand", name: "Brand Systems" },
];

const R = (id: string, title: string, category: string, tags: string[], height: number, collectionId?: string, saved = false): InspirationRef => ({
  id: `ref_${id.slice(6, 14)}`, title, url: `https://unsplash.com/photos/${id.replace("photo-", "")}`,
  image: img(id, 600), category, tags, notes: "", collectionId, saved, height,
});

export const seedRefs = (): InspirationRef[] => [
  R("photo-1478720568477-152d9b164e26", "Neon cinema marquee", "Cinematic Color Grading", ["neon", "night"], 320, "col_grade", true),
  R("photo-1557672172-298e090bd0f1", "Fluid gradient study", "Motion Graphics", ["gradient", "abstract"], 420, "col_title", true),
  R("photo-1561070791-2526d30994b5", "Editorial type grid", "Typography", ["editorial", "grid"], 280),
  R("photo-1558655146-9f40138edfeb", "Brand board layout", "Brand Design", ["system", "palette"], 360, "col_brand", true),
  R("photo-1505740420928-5e560c06d30e", "Product hero lighting", "Product Advertisements", ["studio", "product"], 400),
  R("photo-1550745165-9bc0b252726f", "Retro tech set", "Visual Effects", ["retro", "crt"], 300),
  R("photo-1488646953014-85cb44e25828", "Travel flatlay", "Video Editing", ["travel", "b-roll"], 260),
  R("photo-1579546929518-9e396f3cc809", "Soft color wash", "Transitions", ["blur", "color"], 380),
  R("photo-1536240478700-b869070f9279", "On-set camera rig", "Cinematic Color Grading", ["bts", "camera"], 340),
  R("photo-1611162617474-5b21e879e113", "Social feed visuals", "Creative Campaigns", ["social", "reel"], 300),
  R("photo-1542831371-29b0f74f9713", "Code-driven visuals", "UI Design", ["generative"], 260),
  R("photo-1518709268805-4e9042af9f23", "Light trails", "Motion Graphics", ["long exposure"], 420),
];

export const seedMedia = (): MediaAsset[] => {
  const d = Date.now();
  return [
    { id: "m1", name: "hero_lighting.jpg", kind: "image", size: 2_400_000, mime: "image/jpeg", addedAt: d - 3600e3, url: img("photo-1505740420928-5e560c06d30e", 600), local: false, usedIn: ["Product Advertisement"] },
    { id: "m2", name: "neon_city.jpg", kind: "image", size: 3_100_000, mime: "image/jpeg", addedAt: d - 7200e3, url: img("photo-1478720568477-152d9b164e26", 600), local: false, usedIn: ["Cinematic Motion Intro"] },
    { id: "m3", name: "gradient_bg.jpg", kind: "graphic", size: 900_000, mime: "image/jpeg", addedAt: d - 86400e3, url: img("photo-1557672172-298e090bd0f1", 600), local: false, usedIn: [] },
    { id: "m4", name: "lisbon_tram.jpg", kind: "image", size: 4_200_000, mime: "image/jpeg", addedAt: d - 3 * 86400e3, url: img("photo-1488646953014-85cb44e25828", 600), local: false, usedIn: ["Travel Film"] },
    { id: "m5", name: "B-roll_city.mp4", kind: "video", size: 184_000_000, mime: "video/mp4", addedAt: d - 2 * 86400e3, local: false, usedIn: ["Cinematic Motion Intro"] },
    { id: "m6", name: "Ambient_pad.wav", kind: "audio", size: 38_000_000, mime: "audio/wav", addedAt: d - 4 * 86400e3, local: false, usedIn: ["Cinematic Motion Intro", "Travel Film"] },
    { id: "m7", name: "Manrope-Variable.ttf", kind: "font", size: 410_000, mime: "font/ttf", addedAt: d - 9 * 86400e3, local: false, usedIn: [] },
    { id: "m8", name: "brand_identity.cstudio", kind: "project", size: 1_200_000, mime: "application/json", addedAt: d - 5 * 86400e3, local: false, usedIn: [] },
  ];
};

export const seedPlugins = (): PluginDef[] => {
  const s = { autoOpen: false, notes: "" };
  return [
    { id: "canva", name: "Canva", category: "Design", description: "Open Canva in a new tab for layouts and quick graphics. Not embedded.", status: "external", url: "https://www.canva.com", color: "#00c4cc", initials: "Ca", settings: s },
    { id: "capcut", name: "CapCut", category: "Video Editing", description: "Shortcut to CapCut's web editor. Editing engine is not available inside Creative Studio.", status: "external", url: "https://www.capcut.com", color: "#e8e8e8", initials: "Cc", settings: s },
    { id: "chrome", name: "Web Research", category: "Research", description: "Open web searches for references from any page.", status: "external", url: "https://www.google.com", color: "#4285f4", initials: "Wb", settings: s },
    { id: "pinterest", name: "Pinterest", category: "Research", description: "Browse pins. Board import requires a future API connector.", status: "external", url: "https://www.pinterest.com", color: "#e60023", initials: "Pi", settings: s },
    { id: "behance", name: "Behance", category: "Research", description: "Explore case studies and motion portfolios.", status: "external", url: "https://www.behance.net", color: "#1769ff", initials: "Bē", settings: s },
    { id: "youtube", name: "YouTube", category: "Research", description: "Tutorials and reference films.", status: "external", url: "https://www.youtube.com", color: "#ff0033", initials: "YT", settings: s },
    { id: "unsplash", name: "Unsplash", category: "File Management", description: "Free stock photography. Direct import planned via API.", status: "available", url: "https://unsplash.com", color: "#f5f5f5", initials: "Un", settings: s },
    { id: "pexels", name: "Pexels", category: "File Management", description: "Stock photos and video. Direct import planned via API.", status: "available", url: "https://www.pexels.com", color: "#05a081", initials: "Px", settings: s },
    { id: "ai", name: "AI Assistant", category: "AI Assistants", description: "Creative chat inside Creative Studio. Runs in demo mode until a provider is configured.", status: "installed", color: "#4f8cff", initials: "AI", settings: s },
    { id: "png-export", name: "PNG Frame Export", category: "Export Tools", description: "Exports the current canvas frame as a PNG image. Built in.", status: "installed", color: "#8b93a7", initials: "PN", settings: s },
    { id: "text-presets", name: "Text Animation Presets", category: "Motion Graphics", description: "Entrance, exit and movement presets for text layers. Built in.", status: "installed", color: "#a770ff", initials: "Tx", settings: s },
    { id: "task-board", name: "Task Board", category: "Productivity", description: "Kanban for project tasks.", status: "coming-soon", color: "#f2b84b", initials: "Tb", settings: s },
    { id: "video-render", name: "Video Render Engine", category: "Export Tools", description: "MP4/ProRes rendering via the future desktop runtime.", status: "coming-soon", color: "#ff8a3d", initials: "Re", settings: s },
    { id: "custom", name: "Custom Plugin SDK", category: "Productivity", description: "Write your own plugins with the typed registry.", status: "coming-soon", color: "#3fd29a", initials: "SDK", settings: s },
  ];
};

export const seedConversations = (): Conversation[] => {
  const d = Date.now();
  return [
    {
      id: "conv_1", title: "Intro sequence ideas", updatedAt: d - 3600e3,
      messages: [
        { id: "m1", role: "user", content: "Give me 3 concepts for a 10-second cinematic intro for a travel film.", createdAt: d - 3700e3 },
        { id: "m2", role: "assistant", content: "**1. Map to Street** — Start on a hand-drawn route, push in until the line becomes a real road (match cut).\n\n**2. Window Light** — Slow parallax across train window reflections; title fades in on the glass.\n\n**3. Postcard Stack** — Polaroids drop and shuffle; the last one expands to full-frame footage.\n\n_(Demo response — no AI provider connected.)_", createdAt: d - 3600e3 },
      ],
    },
    {
      id: "conv_2", title: "Reel caption drafts", updatedAt: d - 86400e3,
      messages: [
        { id: "m3", role: "user", content: "Write captions for a reel about three quick editing tricks.", createdAt: d - 86500e3 },
        { id: "m4", role: "assistant", content: "- \"3 edits that make your footage feel expensive 🎬\"\n- \"Steal these transitions. Seriously.\"\n- \"Save this before your next edit.\"\n\n_(Demo response.)_", createdAt: d - 86400e3 },
      ],
    },
  ];
};
