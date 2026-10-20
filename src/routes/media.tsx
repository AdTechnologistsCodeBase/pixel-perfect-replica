import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/media")({
  head: () => ({ meta: [{ title: "media — Creative Studio" }, { name: "description", content: "Creative Studio media workspace." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">This section is not built yet.</div>,
});
