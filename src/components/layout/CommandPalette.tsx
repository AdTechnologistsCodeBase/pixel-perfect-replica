import { useNavigate } from "@tanstack/react-router";
import { FilePlus2 } from "lucide-react";
import { useEffect } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { NAV } from "@/components/navigation/nav";
import { useProjects } from "@/stores/projects";
import { useUI } from "@/stores/ui";

export function CommandPalette() {
  const open = useUI((s) => s.commandOpen);
  const setOpen = useUI((s) => s.setCommandOpen);
  const openNew = useUI((s) => s.openNewProject);
  const projects = useProjects((s) => s.projects);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useUI.getState().commandOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => openNew())}><FilePlus2 className="mr-2 size-4" /> New project</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Go to">
          {NAV.map((n) => (
            <CommandItem key={n.to} onSelect={() => run(() => navigate({ to: n.to }))}>
              <n.icon className="mr-2 size-4" /> {n.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem key={p.id} value={`project ${p.name}`} onSelect={() => run(() => navigate({ to: "/editor", search: { id: p.id } }))}>
              {p.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
