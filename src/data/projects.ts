export interface Project {
	title: string;
	description: string;
	technologies: string[];
	liveUrl: string;
	sourceUrl: string;
	image: string;
	imageAlt: string;
	imageWidth: number;
	imageHeight: number;
	notesUrl?: string;
}

export const projects: Project[] = [
	{
		title: 'PokéGuess',
		description: 'A multilingual Pokémon guessing game with clues in English, 简体中文, and 日本語.',
		technologies: ['React', 'TypeScript', 'Vite'],
		liveUrl: 'https://irenex86.github.io/PokeGuess/',
		sourceUrl: 'https://github.com/IreneX86/PokeGuess',
		image: '/images/projects/pokeguess/pokeguess-home.png',
		imageAlt: 'PokéGuess home screen with the Pokémon search field and empty guess history',
		imageWidth: 2938,
		imageHeight: 1662,
	},
];
