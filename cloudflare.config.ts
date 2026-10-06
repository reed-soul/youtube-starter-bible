import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "youtube-starter-bible",
		compatibilityDate: "2026-10-06",
		workersDev: true,
		observability: {
			enabled: true,
			traces: {
				enabled: true,
			},
		},
		assets: {
			htmlHandling: "auto-trailing-slash",
			notFoundHandling: "404-page",
		},
		// Custom domain requires an active Cloudflare zone for taoliapp.com
		// on this account. Currently blocked: zone not present; public NS are
		// Alibaba (hichina). Re-add "creator.taoliapp.com" under domains once
		// the zone is on this account.
		// domains: ["creator.taoliapp.com"],
	},
});
