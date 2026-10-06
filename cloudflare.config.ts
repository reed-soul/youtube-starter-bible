import { defineConfig } from "cf/config";

/**
 * Production site: Cloudflare Pages project `youtube-starter-bible`
 *   https://youtube-starter-bible.pages.dev
 *   custom domain creator.taoliapp.com (external CNAME → *.pages.dev)
 * Deploy: `npm run deploy` → wrangler pages deploy
 *
 * This file / `cf deploy` targets a leftover Workers Static Assets Worker
 * (same name, *.workers.dev). Keep until Pages custom domain is active, then delete Worker.
 */
export default defineConfig({
	worker: {
		name: "youtube-starter-bible",
		compatibilityDate: "2026-10-06",
		workersDev: true,
		observability: {
			enabled: true,
			traces: { enabled: true },
		},
		assets: {
			htmlHandling: "auto-trailing-slash",
			notFoundHandling: "404-page",
		},
	},
});
