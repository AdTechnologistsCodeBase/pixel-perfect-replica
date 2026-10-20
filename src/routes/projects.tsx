import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "projects — Creative Studio" }, { name: "description", content: "Creative Studio projects workspace." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">This section is not built yet.</div>,
});
