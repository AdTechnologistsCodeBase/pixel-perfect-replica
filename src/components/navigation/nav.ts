import { Bot, Clapperboard, FolderKanban, Home, Images, Lightbulb, Puzzle, Settings } from "lucide-react";

export const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/editor", label: "Editor", icon: Clapperboard },
  { to: "/media", label: "Media Library", icon: Images },
  { to: "/inspiration", label: "Inspiration", icon: Lightbulb },
  { to: "/plugins", label: "Plugin Center", icon: Puzzle },
  { to: "/ai", label: "AI Workspace", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export type NavPath = (typeof NAV)[number]["to"];
