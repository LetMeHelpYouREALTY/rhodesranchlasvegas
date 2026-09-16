/**
 * Upload git-backed WebP files from public/images/ into Cloudflare hosted Images
 * using custom IDs (hero-homes.webp → id=hero-homes).
 *
 * Hosted Images delivery (do not orange-cloud the Vercel hostname):
 *   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
 *
 * Required:
 *   CLOUDFLARE_API_TOKEN   Account → Cloudflare Images → Edit
 * Optional:
 *   CLOUDFLARE_ACCOUNT_ID  (defaults to the Rhodes Ranch Images account)
 *   NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH
 *   NEXT_PUBLIC_CLOUDFLARE_IMAGES_VARIANT=public
 *
 * @see https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/
 * @see https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/
 */
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, "..", "public", "images");

/** Images account ID from the Cloudflare dashboard (not a secret; the API token is). */
const DEFAULT_ACCOUNT_ID = "2cc579c1ec9e426ed585e933ebf4753b";
/** Developer Resources account hash — public; used in imagedelivery.net URLs. */
const DEFAULT_ACCOUNT_HASH = "byE6BTe9lNqo21V57n4aPQ";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim() || DEFAULT_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
const accountHash =
  process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH?.trim() || DEFAULT_ACCOUNT_HASH;
const variant = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_VARIANT?.trim() || "public";

if (!token) {
  console.error(
    "[cloudflare-images] Missing CLOUDFLARE_API_TOKEN (Account.Cloudflare Images Edit).",
  );
  console.error(
    "Create a token at https://dash.cloudflare.com/profile/api-tokens then rerun:",
  );
  console.error(
    "  CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=" +
      accountId +
      " npm run images:upload-cloudflare",
  );
  process.exit(1);
}

const files = (await readdir(imagesDir)).filter((name) => name.endsWith(".webp"));
if (files.length === 0) {
  console.error("[cloudflare-images] No .webp files in public/images/");
  process.exit(1);
}

function deliveryUrl(id) {
  return `https://imagedelivery.net/${accountHash}/${id}/${variant}`;
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {string} id
 * @param {Buffer} bytes
 * @param {string} file
 */
async function upload(id, bytes, file) {
  const body = new FormData();
  body.set("id", id);
  body.set("file", new File([bytes], file, { type: "image/webp" }));
  body.set("requireSignedURLs", "false");

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    },
  );
  const json = await res.json().catch(() => ({}));
  return { res, json };
}

/**
 * @param {string} id
 */
async function verifyDelivery(id) {
  const url = deliveryUrl(id);
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.ok) return true;
    await sleep(500 * (attempt + 1));
  }
  return false;
}

let failed = 0;
let uploaded = 0;
let skipped = 0;

for (const file of files.sort()) {
  const id = file.replace(/\.webp$/, "");
  const bytes = await readFile(join(imagesDir, file));
  const { res, json } = await upload(id, bytes, file);

  if (!res.ok || json?.success === false) {
    const blob = JSON.stringify(json).toLowerCase();
    const alreadyExists =
      blob.includes("already") || blob.includes("duplicate") || res.status === 409;
    if (alreadyExists) {
      skipped += 1;
      console.log(`[cloudflare-images] skip existing id=${id}`);
    } else {
      failed += 1;
      console.error(`[cloudflare-images] FAIL ${id}`, json?.errors ?? json);
      continue;
    }
  } else {
    uploaded += 1;
    const variantUrl = json?.result?.variants?.[0];
    console.log(`[cloudflare-images] uploaded ${id}${variantUrl ? ` → ${variantUrl}` : ""}`);
  }

  const ok = await verifyDelivery(id);
  if (!ok) {
    failed += 1;
    console.error(`[cloudflare-images] delivery 404 ${deliveryUrl(id)}`);
  } else {
    console.log(`[cloudflare-images] live ${deliveryUrl(id)}`);
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log(
  `[cloudflare-images] done (uploaded ${uploaded}, skipped ${skipped}, ${files.length} files).`,
);
console.log(
  `[cloudflare-images] Set NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH=${accountHash} on Vercel Production + Preview, then redeploy.`,
);
console.log(
  "[cloudflare-images] Do not orange-cloud the Vercel hostname; delivery uses imagedelivery.net.",
);
