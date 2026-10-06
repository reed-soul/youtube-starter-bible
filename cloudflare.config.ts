import { defineConfig } from "cf/config";

/**
 * Production hosting is Cloudflare Pages (not this Worker config).
 * Deploy: `npm run deploy` → wrangler pages deploy → youtube-starter-bible.pages.dev
 * Custom domain: https://creator.taoliapp.com/
 *
 * This stub remains so `cf` project detection stays valid; do not `cf deploy`
 * unless intentionally recreating a Worker.
 */
export default defineConfig({
	worker: {
		name: "youtube-starter-bible-unused",
		compatibilityDate: "2026-10-06",
		workersDev: false,
	},
});
