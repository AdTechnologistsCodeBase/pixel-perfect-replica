import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "ai — Creative Studio" }, { name: "description", content: "Creative Studio ai workspace." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">This section is not built yet.</div>,
});
