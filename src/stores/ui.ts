import { create } from "zustand";
import type { ProjectType } from "@/types";

interface UIState {
  newProjectOpen: boolean;
  newProjectType: ProjectType;
  commandOpen: boolean;
  hydrated: boolean;
  openNewProject: (t?: ProjectType) => void;
  closeNewProject: () => void;
  setCommandOpen: (v: boolean) => void;
  setHydrated: () => void;
}

export const useUI = create<UIState>((set) => ({
  newProjectOpen: false,
  newProjectType: "video",
  commandOpen: false,
  hydrated: false,
  openNewProject: (t = "video") => set({ newProjectOpen: true, newProjectType: t }),
  closeNewProject: () => set({ newProjectOpen: false }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setHydrated: () => set({ hydrated: true }),
}));
