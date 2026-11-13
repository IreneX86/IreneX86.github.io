# Irene X

Personal blog built with Astro, TypeScript, Markdown, and CSS.

## Development

```sh
npm install
npm run dev
```

Create a production build and run Astro's validation with:

```sh
npm run build
npm run astro -- check
```

## Writing a new post

Posts live in `src/data/blog/` as Markdown files. Copy `docs/post-template.md` into that directory, rename it with a short lowercase filename such as `my-article.md`, and replace the example content.

Required frontmatter:

- `title`
- `description`
- `publishedDate`

Optional frontmatter:

- `updatedDate`
- `tags` (defaults to an empty list)
- `draft` (defaults to `false`)
- `test` (defaults to `false`)

Posts with `draft: true` are excluded from the website, RSS feed, and sitemap because no article route is generated for them. The `test` field only marks temporary fixture content in the interface; it does not hide a post.

The post URL is derived from the Markdown filename. For example, `my-article.md` becomes `/blog/my-article/`.

Preview locally with `npm run dev`. Before publishing, run both validation commands above and confirm the generated page looks correct.

## Languages

Use the header’s 中文 / EN button to switch the interface. English is the default; a visitor’s explicit choice is stored locally and restored on subsequent pages. The theme preference is independent.

Interface translations are maintained in `src/i18n/zh.ts`. Wrap new visible interface text in `Localized` (`src/components/Localized.astro`), passing its English string as `text`. Unknown strings fall back to English. Article bodies remain in their source language; Chinese mode displays an original-language notice. Article titles and summaries can be translated through the dictionary. This interface toggle does not create separate language URLs.
