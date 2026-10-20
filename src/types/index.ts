export type ProjectType = "video" | "motion" | "graphic" | "reel" | "custom";
export type ProjectStatus = "draft" | "in-progress" | "review" | "complete";

export type ElementKind = "text" | "rect" | "ellipse" | "image";
export type AnimPreset = "none" | "fade-in" | "slide-up" | "slide-left" | "scale-in" | "fade-out" | "move-right";
export type Easing = "linear" | "ease-in" | "ease-out" | "ease-in-out";

export interface ElementAnimation {
  preset: AnimPreset;
  /** seconds relative to clip start */
  offset: number;
  duration: number;
  easing: Easing;
}

export interface CanvasElement {
  id: string;
  kind: ElementKind;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  fill: string;
  text?: string;
  fontSize?: number;
  fontWeight?: number;
  align?: "left" | "center" | "right";
  src?: string;
  radius?: number;
  animation: ElementAnimation;
}

export type ClipKind = "video" | "audio" | "text" | "image" | "shape";

export interface Track {
  id: string;
  name: string;
  kind: ClipKind;
}

export interface Clip {
  id: string;
  trackId: string;
  name: string;
  kind: ClipKind;
  start: number;
  duration: number;
  /** links clip to a canvas element (controls visibility) */
  elementId?: string | undefined;
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  width: number;
  height: number;
  fps: number;
  background: string;
  thumbnail: string;
  createdAt: number;
  updatedAt: number;
  duration: number;
  elements: CanvasElement[];
  tracks: Track[];
  clips: Clip[];
}

export type MediaKind = "image" | "video" | "audio" | "font" | "graphic" | "project";

export interface MediaAsset {
  id: string;
  name: string;
  kind: MediaKind;
  size: number;
  mime: string;
  addedAt: number;
  /** remote sample URL; local assets use blob from IndexedDB */
  url?: string;
  local: boolean;
  usedIn: string[];
}

export interface InspirationRef {
  id: string;
  title: string;
  url: string;
  image: string;
  category: string;
  tags: string[];
  notes: string;
  collectionId?: string | undefined;
  saved: boolean;
  height: number;
}

export interface Collection {
  id: string;
  name: string;
}

export type PluginStatus = "available" | "installed" | "connected" | "external" | "coming-soon";
export type PluginCategory =
  | "Design"
  | "Video Editing"
  | "Motion Graphics"
  | "AI Assistants"
  | "Research"
  | "File Management"
  | "Productivity"
  | "Export Tools";

export interface PluginDef {
  id: string;
  name: string;
  category: PluginCategory;
  description: string;
  status: PluginStatus;
  url?: string;
  color: string;
  initials: string;
  settings: { autoOpen: boolean; notes: string };
}

export type ChatRole = "user" | "assistant";
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  error?: boolean;
}
export interface Conversation {
  id: string;
  title: string;
  updatedAt: number;
  projectId?: string | undefined;
  messages: ChatMessage[];
}
