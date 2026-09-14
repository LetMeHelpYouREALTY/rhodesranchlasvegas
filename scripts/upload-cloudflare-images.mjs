/**
 * Upload git-backed WebP files from public/images/ to Cloudflare Images
 * using custom IDs that match the filename (hero-homes.webp → id=hero-homes).
 *
 * Required env:
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_API_TOKEN   (Account.Cloudflare Images Edit)
 *
 * After a successful run, set in Vercel (Production + Preview):
 *   NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH  (Images → Developer Resources)
 *   NEXT_PUBLIC_CLOUDFLARE_IMAGES_VARIANT=public
 *
 * @see https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/
 */
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, "..", "public", "images");

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const token = process.env.CLOUDFLARE_API_TOKEN?.trim();

if (!accountId || !token) {
  console.error(
    "[cloudflare-images] Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN, then rerun.",
  );
  process.exit(1);
}

const files = (await readdir(imagesDir)).filter((name) => name.endsWith(".webp"));
if (files.length === 0) {
  console.error("[cloudflare-images] No .webp files in public/images/");
  process.exit(1);
}

let failed = 0;
for (const file of files.sort()) {
  const id = file.replace(/\.webp$/, "");
  const bytes = await readFile(join(imagesDir, file));
  const body = new FormData();
  body.set("id", id);
  body.set("file", new File([bytes], file, { type: "image/webp" }));

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    },
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    const alreadyExists = JSON.stringify(json).toLowerCase().includes("already");
    if (alreadyExists) {
      console.log(`[cloudflare-images] skip existing id=${id}`);
      continue;
    }
    failed += 1;
    console.error(`[cloudflare-images] FAIL ${id}`, json?.errors ?? json);
    continue;
  }
  const variant = json?.result?.variants?.[0];
  console.log(`[cloudflare-images] uploaded ${id}${variant ? ` → ${variant}` : ""}`);
}

if (failed > 0) {
  process.exit(1);
}
console.log(
  `[cloudflare-images] done (${files.length} files). Set NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH in Vercel, then redeploy.`,
);
