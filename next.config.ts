import type { NextConfig } from "next";
import path from "path";

/** Pin Turbopack root when multiple lockfiles exist above this repo (silences wrong-root warnings). */
const turbopackRoot = path.resolve(process.cwd());

/* Listing photos and widget assets often load from em/www RealScout, MLS CDNs (S3/CloudFront), etc.
 * If stylesheets from em.* are blocked, the office-listings widget can render text but not photos. */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://em.realscout.com https://assets.calendly.com https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com https://em.realscout.com https://www.realscout.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com https://em.realscout.com https://www.realscout.com",
  "media-src 'self' data: blob: https:",
  "worker-src 'self' blob: https://em.realscout.com",
  "connect-src 'self' https://www.realscout.com https://em.realscout.com wss://www.realscout.com wss://em.realscout.com https://cdn.repliers.io https://*.repliers.io https://calendly.com https://*.calendly.com https://api.calendly.com https://www.google-analytics.com https://region1.google-analytics.com https://region1.analytics.google.com https://analytics.google.com https://stats.g.doubleclick.net https://www.google.com https://www.googletagmanager.com https://maps.googleapis.com https://*.googleapis.com https://*.s3.amazonaws.com https://s3.amazonaws.com https://*.cloudfront.net https://*.amazonaws.com",
  "frame-src 'self' https://maps.google.com https://www.google.com https://www.google.com/maps https://www.realscout.com https://em.realscout.com https://calendly.com https://*.calendly.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/* Lighthouse “Legacy JavaScript”: `browserslist.production` in package.json targets modern engines. Polyfill
 * strings in `/_next/static/chunks/*.js` often come from Next’s client runtime. After `next build`, grep those
 * files to confirm; meaningful reduction may require a Next upgrade (see vercel/next.js discussions on modern output). */

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
    ],
  },
  /** Tailwind-friendly: inline CSS in production to shorten the HTML → stylesheet critical chain (FCP/LCP). */
  experimental: {
    inlineCss: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  turbopack: {
    root: turbopackRoot,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=(), join-ad-interest-group=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
