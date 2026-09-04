/**
 * Canonical origin for metadata, the sitemap and robots.
 *
 * Vercel injects VERCEL_PROJECT_PRODUCTION_URL at build time, so the deployed
 * site resolves its own domain without anything being hardcoded here.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
