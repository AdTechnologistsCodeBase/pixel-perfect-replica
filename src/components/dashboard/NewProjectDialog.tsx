import { useNavigate } from "@tanstack/react-router";
import { Clapperboard, Film, LayoutTemplate, Smartphone, SquareDashed } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blankProject, PROJECT_TYPE_LABEL } from "@/data/projects";
import { useSettings } from "@/stores/library";
import { useProjects } from "@/stores/projects";
import { useUI } from "@/stores/ui";
import type { ProjectType } from "@/types";
import { cn } from "@/lib/utils";

const TYPES: { type: ProjectType; icon: typeof Film; w: number; h: number }[] = [
  { type: "video", icon: Film, w: 1920, h: 1080 },
  { type: "motion", icon: Clapperboard, w: 1920, h: 1080 },
  { type: "graphic", icon: LayoutTemplate, w: 1080, h: 1350 },
  { type: "reel", icon: Smartphone, w: 1080, h: 1920 },
  { type: "custom", icon: SquareDashed, w: 1200, h: 1200 },
];

export function NewProjectDialog() {
  const open = useUI((s) => s.newProjectOpen);
  const initialType = useUI((s) => s.newProjectType);
  const close = useUI((s) => s.closeNewProject);
  const add = useProjects((s) => s.add);
  const settings = useSettings((s) => s.settings);
  const navigate = useNavigate();
  const [type, setType] = useState<ProjectType>("video");
  const [name, setName] = useState("Untitled Project");
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);
  const [fps, setFps] = useState(30);
  const [bg, setBg] = useState("#0d1017");

  const pick = (t: ProjectType) => {
    setType(t);
    const d = TYPES.find((x) => x.type === t);
    if (d) {
      const useDefault = t === "video" || t === "motion";
      setW(useDefault ? settings.defaultWidth : d.w);
      setH(useDefault ? settings.defaultHeight : d.h);
    }
  };

  useEffect(() => {
    if (open) {
      pick(initialType);
      setName("Untitled Project");
      setFps(settings.defaultFps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const orientation = w === h ? "square" : w > h ? "landscape" : "portrait";
  const setOrientation = (o: string) => {
    if (o === "square") setH(w);
    else if ((o === "landscape" && h > w) || (o === "portrait" && w > h)) {
      setW(h);
      setH(w);
    }
  };
  const valid = name.trim() && w >= 16 && h >= 16 && w <= 8192 && h <= 8192;

  const create = () => {
    if (!valid) return;
    const p = blankProject({ name: name.trim(), type, width: w, height: h, fps: type === "graphic" ? 0 : fps, background: bg });
    add(p);
    close();
    toast.success("Project created", { description: "Saved in this browser's local storage." });
    navigate({ to: "/editor", search: { id: p.id } });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>Choose a starting format. You can change everything later.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          {TYPES.map((t) => (
            <button
              key={t.type}
              onClick={() => pick(t.type)}
              className={cn("flex flex-col items-center gap-1.5 rounded-md border border-border p-2.5 text-center text-[11px] transition-colors hover:border-primary/60", type === t.type && "border-primary bg-primary/10 text-foreground")}
            >
              <t.icon className={cn("size-5 text-muted-foreground", type === t.type && "text-primary")} />
              {PROJECT_TYPE_LABEL[t.type]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="np-name">Project name</Label>
            <Input id="np-name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && create()} />
          </div>
          <div className="space-y-1.5">
            <Label>Width (px)</Label>
            <Input type="number" value={w} onChange={(e) => setW(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Height (px)</Label>
            <Input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Orientation</Label>
            <Select value={orientation} onValueChange={setOrientation}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="landscape">Landscape</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="square">Square</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Frame rate</Label>
            <Select value={String(fps)} onValueChange={(v) => setFps(Number(v))} disabled={type === "graphic"}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[24, 25, 30, 50, 60].map((f) => <SelectItem key={f} value={String(f)}>{f} fps</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 flex items-center gap-3">
            <Label>Background</Label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-12 cursor-pointer rounded border border-input bg-transparent" />
            <span className="font-mono text-xs text-muted-foreground">{bg}</span>
          </div>
        </div>
        {!valid && <p className="text-xs text-destructive">Enter a name and dimensions between 16 and 8192 px.</p>}
        <DialogFooter>
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button onClick={create} disabled={!valid}>Create & open</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
