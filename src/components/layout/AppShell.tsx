import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Command,
  HardDrive,
  Lock,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { NAV } from "@/components/navigation/nav";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSettings } from "@/stores/library";
import { useProjects } from "@/stores/projects";
import { useUI } from "@/stores/ui";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils";

function Sidebar() {
  const collapsed = useSettings((s) => s.settings.sidebarCollapsed);
  const appName = useSettings((s) => s.settings.appName);
  const set = useSettings((s) => s.set);
  const { pathname: path } = useLocation();
  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
        collapsed ? "w-14" : "w-56",
      )}
    >
      <div className="flex h-12 items-center gap-2 border-b border-sidebar-border px-3">
        <div className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        {!collapsed && <span className="truncate text-sm font-bold tracking-tight">{appName}</span>}
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {NAV.map((n) => {
          const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
          const link = (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active &&
                  "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_var(--primary)]",
              )}
            >
              <n.icon className={cn("size-4 shrink-0", active && "text-primary")} />
              {!collapsed && <span className="truncate">{n.label}</span>}
            </Link>
          );
          return collapsed ? (
            <Tooltip key={n.to}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right">{n.label}</TooltipContent>
            </Tooltip>
          ) : (
            link
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-sidebar-border p-2">
        {!collapsed && (
          <div className="rounded-md bg-sidebar-accent/60 p-2.5 text-[11px] text-muted-foreground">
            <div className="mb-1.5 flex items-center gap-1.5 font-medium text-sidebar-foreground">
              <HardDrive className="size-3.5" /> Local workspace
              <span className="ml-auto size-1.5 rounded-full bg-success" />
            </div>
            <div className="h-1 overflow-hidden rounded bg-border">
              <div className="h-full w-[38%] bg-primary" />
            </div>
            <div className="mt-1.5 flex justify-between">
              <span>Sample: 38 GB of 100 GB</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <Lock className="size-3" /> Private · v0.1.0-preview
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-muted-foreground"
          onClick={() => set({ sidebarCollapsed: !collapsed })}
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <>
              <ChevronsLeft className="size-4" /> Collapse
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

function TopBar() {
  const { pathname: path } = useLocation();
  const title =
    NAV.find((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)))?.label ??
    "Creative Studio";
  const setCommandOpen = useUI((s) => s.setCommandOpen);
  const openNew = useUI((s) => s.openNewProject);
  const activity = useProjects((s) => s.activity);
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-panel px-4">
      <h1 className="min-w-0 truncate text-sm font-semibold">{title}</h1>
      <button
        onClick={() => setCommandOpen(true)}
        className="mx-auto flex h-8 w-full max-w-md items-center gap-2 rounded-md border border-input bg-background px-3 text-xs text-muted-foreground transition-colors hover:border-primary/50"
      >
        <Search className="size-3.5" /> Search projects, pages, actions…
        <kbd className="ml-auto flex items-center gap-0.5 rounded border border-border px-1.5 font-mono text-[10px]">
          <Command className="size-2.5" />K
        </kbd>
      </button>
      <Button size="sm" onClick={() => openNew()} className="h-8">
        <Plus className="size-4" /> New
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative size-8" aria-label="Activity">
            <Bell className="size-4" />
            {activity.length > 0 && (
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 p-0">
          <div className="border-b border-border px-3 py-2 text-xs font-semibold">
            Recent activity
          </div>
          <ul className="max-h-72 overflow-auto py-1 text-xs">
            {activity.length === 0 && (
              <li className="px-3 py-4 text-muted-foreground">No activity yet.</li>
            )}
            {activity.map((a) => (
              <li key={a.id} className="flex justify-between gap-2 px-3 py-1.5">
                <span>{a.text}</span>
                <span className="shrink-0 text-muted-foreground">{timeAgo(a.at)}</span>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
        <Lock className="size-3 text-success" /> Personal workspace
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname: path } = useLocation();
  const isEditor = path.startsWith("/editor");
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {!isEditor && <TopBar />}
        <main className={cn("min-h-0 flex-1", isEditor ? "overflow-hidden" : "overflow-auto")}>
          {children}
        </main>
      </div>
    </div>
  );
}
