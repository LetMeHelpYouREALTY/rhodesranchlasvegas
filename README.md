This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This app is a standard **Next.js App Router** project at the **repository root** (`package.json` and `app/` at the top level). See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Fix platform `404: NOT_FOUND` (Vercel HTML error)

If the browser shows Vercel’s minimal **404: NOT_FOUND** page (`Code: NOT_FOUND`, `ID: sfo1::…`), that is a **platform routing** issue—not `app/not-found.tsx`. Work through this list in order:

1. **Deployments** — Open the project on Vercel → **Deployments**. The latest deployment for `main` must be **Ready** (not Error). Open the deployment and use the **Visit** URL Vercel shows for that build. If the build failed, fix errors in the build log first.
2. **Root Directory** — **Settings → General → Root Directory** must be **empty** (not a subfolder). This repo is not a monorepo; a wrong folder here breaks the build output.
3. **Git** — **Settings → Git**: confirm the correct GitHub repo and **Production Branch** (`main`).
4. **Framework** — Should detect **Next.js**. [`vercel.json`](vercel.json) sets `framework: "nextjs"` and explicit install/build commands for consistency.
5. **Environment variables** — In **Settings → Environment Variables**, set **`NEXT_PUBLIC_SITE_URL`** to your live canonical URL (no trailing slash), e.g. `https://www.yourdomain.com`. Copy names from [`.env.example`](.env.example). This must match the hostname you use in Search Console and your Google Business Profile website field.
6. **Open house map (same My Map on every domain)** — One Google My Map can power every site. Do **not** use the My Maps *edit* URL in iframes; use the **embed** URL:
   - **`NEXT_PUBLIC_OPEN_HOUSES_MAP_EMBED_URL`** = `https://www.google.com/maps/d/embed?mid=12gQ1w5bzxrQ41HSGCdEJWFfhMtSkBwI&ehbc=2E312F`
   - Optional: **`NEXT_PUBLIC_LOCATIONS_MAP_EMBED_URL`** — same value unless a site should show a different “Key locations” map (see [`.env.example`](.env.example)). If unset, `lib/env.ts` defaults the locations map to the same embed.
   - **Vercel portfolio:** In **Team → Settings → Environment Variables** (or each project’s **Settings → Environment Variables**), set the same `NEXT_PUBLIC_OPEN_HOUSES_MAP_EMBED_URL` for **Production** (and Preview if you test maps there), then **redeploy** each project so the new `NEXT_PUBLIC_*` is baked in. Cloned/forked repos: either merge the default from `lib/env.ts` or set the variable per project.
7. **Custom domains** — **Settings → Domains**: each domain must be attached to **this** project. At your DNS host (e.g. Cloudflare), use the records Vercel shows. For Cloudflare, use **DNS only (gray cloud)** for records pointing at Vercel—orange-cloud proxy can break SSL or routing with Vercel.
8. **Cloudflare hosted Images** — heading photos upload to Images storage (`npm run images:upload-cloudflare`) and serve from `https://imagedelivery.net/byE6BTe9lNqo21V57n4aPQ/<id>/public`. Keep git copies in `public/images/` as backup. Set `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH` on Vercel only after `npm run images:verify-cloudflare` passes. This is **not** the same as orange-clouding the Vercel hostname.
9. **Local sanity check** — Run `npm run build` locally; it must succeed before expecting a green Vercel deploy.

Reference: [Vercel NOT_FOUND](https://vercel.com/docs/errors/NOT_FOUND).
