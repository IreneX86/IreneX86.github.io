export const SITE = {
	title: 'Irene X',
	author: 'Irene X',
	description: "Notes on software, AI, and things I'm learning.",
	url: 'https://irenex86.github.io',
	github: 'https://github.com/IreneX86',
	githubUsername: 'IreneX86',
	blogDescription: 'Notes, experiments, and things worth remembering.',
	aboutDescription: 'About Irene and this small place for notes, experiments, and technical writing.',
} as const;

export function absoluteUrl(path: string): string {
	return new URL(path, SITE.url).href;
}
