import type { ChatMessage } from "@/types";

/** Provider-agnostic AI interface. A real provider (local model or a secure
 * server-side proxy) can implement this later — never put API keys in the browser. */
export interface AIProvider {
  id: string;
  label: string;
  isConfigured: boolean;
  complete: (history: ChatMessage[], context?: string) => Promise<string>;
}

const templates: { match: RegExp; reply: (q: string) => string }[] = [
  { match: /shot ?list/i, reply: () => "**Shot list (draft)**\n1. WS — establishing, golden hour, 4s\n2. MS — subject enters frame left, 3s\n3. CU — hands / detail insert, 2s\n4. POV — handheld walk, 4s\n5. WS — pull-out reveal, 5s" },
  { match: /script/i, reply: () => "**Script draft**\n\nVO: \"Every place has a rhythm.\"\n_Cut to street level, ambient sound up._\nVO: \"You just have to slow down enough to hear it.\"\n_Title card._" },
  { match: /transition/i, reply: () => "Try these transitions:\n- **Match cut** on shape or motion direction\n- **Whip pan** with 4–6 frame motion blur\n- **Light leak** dissolve over 12 frames\n- **Mask wipe** using a foreground object" },
  { match: /caption|social|reel/i, reply: () => "Caption ideas:\n- \"Save this for your next edit.\"\n- \"The 3-second rule that changed my reels.\"\n- \"POV: your footage finally looks cinematic.\"" },
  { match: /storyboard/i, reply: () => "**Storyboard — 4 frames**\n1. Black → logo sparkle\n2. Logo splits into brand colors\n3. Colors become product silhouette\n4. Product hero + tagline" },
  { match: /motion|animate|prompt/i, reply: () => "Motion prompt: \"Kinetic typography, bold sans serif, words slide up with ease-out, 0.6s stagger, dark graphite background, single electric-blue accent line sweeping left to right.\"" },
];

export const mockProvider: AIProvider = {
  id: "mock",
  label: "Demo mode (mock responses)",
  isConfigured: false,
  complete: async (history, context) => {
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
    const last = [...history].reverse().find((m) => m.role === "user");
    const q = last?.content ?? "";
    if (/fail|error test/i.test(q)) throw new Error("Simulated provider error");
    const hit = templates.find((t) => t.match.test(q));
    const body = hit ? hit.reply(q) : `Here's a quick take on "${q.slice(0, 80)}":\n\n- Define the goal and audience first\n- Sketch 2–3 directions before committing\n- Keep a reference board for tone and color`;
    const ctx = context ? `\n\n_Context: ${context}_` : "";
    return `${body}${ctx}\n\n_(Demo response — no AI provider connected.)_`;
  },
};

export function getProvider(): AIProvider {
  return mockProvider;
}
