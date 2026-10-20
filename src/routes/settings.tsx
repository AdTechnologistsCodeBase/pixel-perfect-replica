import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "settings — Creative Studio" }, { name: "description", content: "Creative Studio settings workspace." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">This section is not built yet.</div>,
});
