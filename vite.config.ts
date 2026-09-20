// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pre-render "/" to static HTML at build time so the exported site is fully static.
    prerender: { enabled: true, pages: [{ path: "/" }] },
  },
  nitro: {
    // Outside the Lovable sandbox, build a fully static site (no server runtime needed).
    // Inside the Lovable build environment this is overridden automatically.
    preset: "static",
    output: { dir: ".output", publicDir: "dist" },
  },
});
