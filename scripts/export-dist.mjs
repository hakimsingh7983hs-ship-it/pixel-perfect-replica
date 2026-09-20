// Copies the pre-rendered static site (nitro's public output) into dist/ so the
// folder can be uploaded to any static host. Runs after `vite build`.
// In the Lovable publish build the output layout is different, so this skips itself.
import { cpSync, existsSync, rmSync } from "node:fs";

const src = ".output/public";
if (!existsSync(`${src}/index.html`)) {
  console.log("[export-dist] No prerendered site found — skipping dist export.");
  process.exit(0);
}

rmSync("dist", { recursive: true, force: true });
cpSync(src, "dist", { recursive: true });
console.log("[export-dist] Static site exported to dist/");
