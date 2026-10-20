import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Collection, Conversation, InspirationRef, MediaAsset, PluginDef, PluginStatus } from "@/types";
import { seedCollections, seedConversations, seedMedia, seedPlugins, seedRefs } from "@/data/catalog";

/* ---------- Media ---------- */
interface MediaState {
  assets: MediaAsset[];
  add: (a: MediaAsset) => void;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
  reset: () => void;
}
export const useMedia = create<MediaState>()(
  persist(
    (set) => ({
      assets: seedMedia(),
      add: (a) => set((s) => ({ assets: [a, ...s.assets] })),
      rename: (id, name) => set((s) => ({ assets: s.assets.map((a) => (a.id === id ? { ...a, name } : a)) })),
      remove: (id) => set((s) => ({ assets: s.assets.filter((a) => a.id !== id) })),
      reset: () => set({ assets: seedMedia() }),
    }),
    { name: "cs-media", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

/* ---------- Inspiration ---------- */
interface InspoState {
  refs: InspirationRef[];
  collections: Collection[];
  upsert: (r: InspirationRef) => void;
  remove: (id: string) => void;
  toggleSave: (id: string) => void;
  addCollection: (c: Collection) => void;
  reset: () => void;
}
export const useInspiration = create<InspoState>()(
  persist(
    (set) => ({
      refs: seedRefs(),
      collections: seedCollections(),
      upsert: (r) =>
        set((s) => ({
          refs: s.refs.some((x) => x.id === r.id) ? s.refs.map((x) => (x.id === r.id ? r : x)) : [r, ...s.refs],
        })),
      remove: (id) => set((s) => ({ refs: s.refs.filter((r) => r.id !== id) })),
      toggleSave: (id) => set((s) => ({ refs: s.refs.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r)) })),
      addCollection: (c) => set((s) => ({ collections: [...s.collections, c] })),
      reset: () => set({ refs: seedRefs(), collections: seedCollections() }),
    }),
    { name: "cs-inspiration", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

/* ---------- Plugins ---------- */
interface PluginState {
  plugins: PluginDef[];
  setStatus: (id: string, status: PluginStatus) => void;
  updateSettings: (id: string, settings: PluginDef["settings"]) => void;
  reset: () => void;
}
export const usePlugins = create<PluginState>()(
  persist(
    (set) => ({
      plugins: seedPlugins(),
      setStatus: (id, status) => set((s) => ({ plugins: s.plugins.map((p) => (p.id === id ? { ...p, status } : p)) })),
      updateSettings: (id, settings) => set((s) => ({ plugins: s.plugins.map((p) => (p.id === id ? { ...p, settings } : p)) })),
      reset: () => set({ plugins: seedPlugins() }),
    }),
    { name: "cs-plugins", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

/* ---------- Chat ---------- */
interface ChatState {
  conversations: Conversation[];
  activeId: string | null;
  setActive: (id: string | null) => void;
  upsert: (c: Conversation) => void;
  remove: (id: string) => void;
  reset: () => void;
}
export const useChat = create<ChatState>()(
  persist(
    (set) => ({
      conversations: seedConversations(),
      activeId: "conv_1",
      setActive: (activeId) => set({ activeId }),
      upsert: (c) =>
        set((s) => ({
          conversations: s.conversations.some((x) => x.id === c.id)
            ? s.conversations.map((x) => (x.id === c.id ? c : x))
            : [c, ...s.conversations],
        })),
      remove: (id) => set((s) => ({ conversations: s.conversations.filter((c) => c.id !== id), activeId: s.activeId === id ? null : s.activeId })),
      reset: () => set({ conversations: seedConversations(), activeId: "conv_1" }),
    }),
    { name: "cs-chat", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

/* ---------- Settings ---------- */
export interface Settings {
  appName: string;
  theme: "graphite" | "dim";
  accent: "blue" | "violet";
  compact: boolean;
  defaultWidth: number;
  defaultHeight: number;
  defaultFps: number;
  exportFormat: "png" | "jpeg";
  exportScale: number;
  workspaceDir: string;
  autosave: boolean;
  aiProvider: "none" | "local" | "remote";
  sidebarCollapsed: boolean;
}
const defaultSettings: Settings = {
  appName: "Creative Studio", theme: "graphite", accent: "blue", compact: false, defaultWidth: 1920, defaultHeight: 1080,
  defaultFps: 30, exportFormat: "png", exportScale: 1, workspaceDir: "C:\\Users\\Me\\CreativeStudio", autosave: true,
  aiProvider: "none", sidebarCollapsed: false,
};
interface SettingsState {
  settings: Settings;
  set: (patch: Partial<Settings>) => void;
  reset: () => void;
}
export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      set: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
      reset: () => set({ settings: defaultSettings }),
    }),
    { name: "cs-settings", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

export const PERSISTED_STORES = [useMedia, useInspiration, usePlugins, useChat, useSettings] as const;
