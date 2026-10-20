import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Project } from "@/types";
import { seedProjects } from "@/data/projects";
import { uid } from "@/utils";

export interface Activity {
  id: string;
  text: string;
  at: number;
}

interface ProjectsState {
  projects: Project[];
  activity: Activity[];
  add: (p: Project) => void;
  update: (id: string, fn: (p: Project) => Project) => void;
  replace: (p: Project) => void;
  rename: (id: string, name: string) => void;
  duplicate: (id: string) => Project | undefined;
  remove: (id: string) => void;
  log: (text: string) => void;
  reset: () => void;
}

export const useProjects = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: seedProjects(),
      activity: [
        { id: "a1", text: "Exported frame from Cinematic Motion Intro", at: Date.now() - 2 * 3600e3 },
        { id: "a2", text: "Added 3 references to Title Sequences", at: Date.now() - 6 * 3600e3 },
        { id: "a3", text: "Product Advertisement moved to review", at: Date.now() - 20 * 3600e3 },
      ],
      log: (text) => set((s) => ({ activity: [{ id: uid("act"), text, at: Date.now() }, ...s.activity].slice(0, 20) })),
      add: (p) => {
        set((s) => ({ projects: [p, ...s.projects] }));
        get().log(`Created project "${p.name}"`);
      },
      update: (id, fn) =>
        set((s) => ({ projects: s.projects.map((p) => (p.id === id ? { ...fn(p), updatedAt: Date.now() } : p)) })),
      replace: (np) => set((s) => ({ projects: s.projects.map((p) => (p.id === np.id ? np : p)) })),
      rename: (id, name) => {
        get().update(id, (p) => ({ ...p, name }));
        get().log(`Renamed project to "${name}"`);
      },
      duplicate: (id) => {
        const src = get().projects.find((p) => p.id === id);
        if (!src) return undefined;
        const copy: Project = { ...structuredClone(src), id: uid("prj"), name: `${src.name} copy`, createdAt: Date.now(), updatedAt: Date.now() };
        set((s) => ({ projects: [copy, ...s.projects] }));
        get().log(`Duplicated "${src.name}"`);
        return copy;
      },
      remove: (id) => {
        const p = get().projects.find((x) => x.id === id);
        set((s) => ({ projects: s.projects.filter((x) => x.id !== id) }));
        if (p) get().log(`Deleted "${p.name}"`);
      },
      reset: () => set({ projects: seedProjects(), activity: [] }),
    }),
    { name: "cs-projects", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);
