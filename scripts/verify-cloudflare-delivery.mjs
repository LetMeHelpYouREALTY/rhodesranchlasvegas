/**
 * HEAD-check hosted Images delivery URLs for every catalog ID.
 * Uses the dashboard account hash by default; does not require an API token.
 *
 * Run: npm run images:verify-cloudflare
 * @see https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = readFileSync(join(root, "lib/site-images.ts"), "utf8");
const ids = [...catalog.matchAll(/^\s+"([a-z0-9-]+)": \{/gm)].map((m) => m[1]);

const accountHash =
  process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH?.trim() ||
  "byE6BTe9lNqo21V57n4aPQ";
const variant = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_VARIANT?.trim() || "public";

if (ids.length === 0) {
  console.error("[verify-cloudflare-delivery] no catalog IDs parsed");
  process.exit(1);
}

let failed = 0;
for (const id of ids) {
  const url = `https://imagedelivery.net/${accountHash}/${id}/${variant}`;
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  if (!res.ok) {
    failed += 1;
    console.error(`[verify-cloudflare-delivery] ${res.status} ${url}`);
    continue;
  }
  console.log(`[verify-cloudflare-delivery] ${res.status} ${url}`);
}

if (failed > 0) {
  console.error(
    `[verify-cloudflare-delivery] ${failed}/${ids.length} missing. Upload with npm run images:upload-cloudflare before setting NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH.`,
  );
  process.exit(1);
}

console.log(`[verify-cloudflare-delivery] OK — ${ids.length} hosted image(s) live`);
