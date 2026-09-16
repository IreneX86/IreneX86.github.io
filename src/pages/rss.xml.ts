import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { getPublishedPosts } from '../utils/posts';

export const GET: APIRoute = async ({ site }) => {
	const posts = await getPublishedPosts();

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: site ?? SITE.url,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedDate,
			link: `/blog/${post.id}/`,
		})),
		customData: '<language>en</language>',
	});
};
