import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/inspiration")({
  head: () => ({ meta: [{ title: "inspiration — Creative Studio" }, { name: "description", content: "Creative Studio inspiration workspace." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">This section is not built yet.</div>,
});
