import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/plugins")({
  head: () => ({ meta: [{ title: "plugins — Creative Studio" }, { name: "description", content: "Creative Studio plugins workspace." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">This section is not built yet.</div>,
});
