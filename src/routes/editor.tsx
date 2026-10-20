import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/editor")({
  validateSearch: (s: Record<string, unknown>): { id?: string | undefined } => ({ id: typeof s.id === "string" ? s.id : undefined }),
  head: () => ({ meta: [{ title: "Editor — Creative Studio" }, { name: "description", content: "Creative Studio editor." }] }),
  component: () => <div className="p-6 text-sm text-muted-foreground">The editor is not built yet.</div>,
});
