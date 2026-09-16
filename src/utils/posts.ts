import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);

	return posts.sort(
		(a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
	);
}

export function formatPostDate(date: Date): string {
	return new Intl.DateTimeFormat('en', {
		day: '2-digit',
		month: 'short',
		timeZone: 'UTC',
	}).format(date);
}

export function formatLongDate(date: Date): string {
	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}

export function estimateReadingTime(body: string | undefined): number {
	if (!body) return 1;

	const text = body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]+`/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_\-[\]()]/g, ' ');
	const words = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

	return Math.max(1, Math.ceil(words / 220));
}
