---
title: "Building PokéGuess"
description: "Building and publishing a multilingual Pokémon guessing game with React, TypeScript, and Vite."
publishedDate: 2026-09-17
tags:
  - Projects
  - React
  - TypeScript
draft: false
test: false
---

PokéGuess is a small browser game about identifying a mystery Pokémon by elimination. It is playable in English, 简体中文, and 日本語, and it now has its own place on the web.

I wanted to turn the familiar act of looking through a Pokédex into a short deduction loop: make a guess, learn something from it, and decide what to try next.

![PokéGuess gameplay showing a name search, a submitted guess, and comparison clues](/images/blog/building-pokeguess/pokeguess-gameplay.gif)

<nav class="article-actions" aria-label="PokéGuess links">
  <a class="article-action article-action-primary" href="https://irenex86.github.io/PokeGuess/">Play PokéGuess</a>
  <a class="article-action article-action-secondary" href="https://github.com/IreneX86/PokeGuess">View Source <span aria-hidden="true">↗</span></a>
</nav>

## One round at a time

When the page opens, the game loads a searchable list and chooses a random answer. The player searches for a Pokémon by name and selects it from the suggestions. Each guess adds a comparison to the history: types and abilities can match, while numeric values such as stats and generation show whether the hidden Pokémon is higher or lower. A correct guess ends the round; otherwise there are ten attempts before the answer is revealed. The Play Again button starts a new round with a new answer and an empty history.

The comparisons are clues, not a score to optimize. I kept the round state in React: the hidden answer, guesses, loading or result status, and the current streak. That makes starting over a matter of resetting a few related values. The streak lasts only for the current page session; refreshing starts it again at zero.

## Keeping data and presentation apart

The app uses React 19 and TypeScript, with Vite as the development server and production builder. The screen is divided into components for the search, comparison history, result dialog, and Pokédex drawer. The comparison itself lives in a separate game function, so the UI can render the result without deciding the rules.

For a number, the function records the guessed value and a direction relative to the hidden answer:

```ts
export function compareNumber(value: number, secret: number) {
  const direction = value === secret ? 'exact' : secret > value ? 'higher' : 'lower'
  return { value, direction }
}
```

That small distinction matters: “higher” means the *answer* is higher, not that the guess is. Categorical clues use exact matches, while types and abilities are compared as sets. The game also follows evolution-chain data so a branching evolution does not have to be reduced to a simple linear list.

Pokémon details come from [PokéAPI](https://pokeapi.co/): the Pokémon, species, evolution chain, and abilities provide the facts needed for a comparison. The search and Pokédex indexes also read public CSV data from the PokéAPI repository. Sprites come from the public sprites repository, with artwork supplied by the API where available. There is no game server of my own. The app caches fetched details in memory and saves the larger search/Pokédex indexes in `localStorage` when the browser permits it; it does not persist an unfinished round.

## Names in three languages

The interface text lives in dictionaries for English, 简体中文, and 日本語. A single language value selects the visible messages and labels:

```ts
export type Language = 'en' | 'zh' | 'ja'
const messages = ui[language]
```

The header button cycles through those languages. Pokémon names are a separate problem from interface text. The search index gathers localized names, and species and ability responses provide names for the detail view. Search terms include the stable identifier alongside the available localized names, while guesses and comparisons use the identifier or numeric ID. Changing the display language therefore does not change which Pokémon was guessed.

Some entries do not have every translation. The data layer falls back to another available name or to English, and official description text can also fall back to English with a notice. The selected language itself is not saved across reloads; the page starts in English.

## Small interface choices

The search offers a short list of matches rather than asking for an exact typed spelling. The comparison view uses symbols and direction labels as well as color, and its wide desktop layout becomes stacked cards on smaller screens. The separate Pokédex drawer is there when a name alone is not enough to recall a Pokémon. These pieces made the game more comfortable to use without adding another game mode or a backend.

## Publishing under `/PokeGuess/`

This blog lives at [the root GitHub Pages site](https://irenex86.github.io/), but the game is a separate repository served at [the PokéGuess project path](https://irenex86.github.io/PokeGuess/). A Vite build that assumes `/` would request its JavaScript and CSS from the wrong place. The game’s Vite configuration sets the base path explicitly:

```ts
base: '/PokeGuess/',
```

That makes the generated asset URLs resolve beneath the project path. A GitHub Actions workflow checks out the repository, installs dependencies, runs lint and type checks, builds the static files, and deploys the output to GitHub Pages. The path was a small configuration detail, but one that only becomes obvious when the built app is served from its real address.

## What I am taking from it

The part I would keep for another small game is the boundary between data, comparison rules, and display names. Stable IDs made language switching less invasive, while the published URL made me check assumptions that a local build could hide. Both details are easy to overlook when the first screen already seems to work.

You can [play PokéGuess](https://irenex86.github.io/PokeGuess/) or [view the source](https://github.com/IreneX86/PokeGuess).
