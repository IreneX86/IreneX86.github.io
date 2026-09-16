// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://irenex86.github.io',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/404/'),
		}),
	],
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
	},
});
