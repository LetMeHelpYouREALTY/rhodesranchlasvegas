/**
 * Ensures every catalog ID in lib/site-images.ts has a git-backed WebP
 * and a PNG original (Cloudflare upload source + backup).
 * Run: node scripts/verify-site-images.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = readFileSync(join(root, "lib/site-images.ts"), "utf8");
const ids = [...catalog.matchAll(/^\s+"([a-z0-9-]+)": \{/gm)].map((m) => m[1]);

if (ids.length === 0) {
  console.error("[verify-site-images] no catalog IDs parsed from lib/site-images.ts");
  process.exit(1);
}

let failed = 0;
for (const id of ids) {
  const webp = join(root, "public/images", `${id}.webp`);
  const png = join(root, "public/images/originals", `${id}.png`);
  if (!existsSync(webp)) {
    console.error(`[verify-site-images] missing ${webp}`);
    failed += 1;
  }
  if (!existsSync(png)) {
    console.error(`[verify-site-images] missing ${png}`);
    failed += 1;
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log(
  `[verify-site-images] OK — ${ids.length} catalog ID(s) each have webp + png originals`,
);
