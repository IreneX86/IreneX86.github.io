---
title: "Writing on This Blog"
description: "A small guide to the text, code, links, lists, quotes, and other formats I use in my notes."
publishedDate: 2026-09-16
tags:
  - Notes
  - Meta
draft: false
test: false
---

This is the first real post on this site.

Instead of beginning with a traditional “Hello, World”, I wanted a small reference for the kinds of formatting I can use in future notes. It is part introduction, part test page, and something I can return to when I forget how a detail is meant to look.

## Text

Most posts will be ordinary paragraphs. Some may record a quick observation; others may need enough room to work through an idea carefully.

A comfortable reading width matters more to me than fitting as much as possible on one screen. Longer paragraphs should still feel calm, with enough space between lines and sections to make technical writing easy to follow without turning every thought into a separate interface element.

### Emphasis

I can use **bold text** for a point that needs weight, *italic text* for a quieter change in tone, and ***bold italic text*** when both kinds of emphasis are useful. Commands such as `npm run dev` and paths such as `src/data/blog/` are clearer as inline code.

For details about the framework behind the site, the [Astro documentation](https://docs.astro.build/) is the most useful reference.

## Lists and structure

Future notes may include:

- small observations worth keeping;
- code snippets and experiments;
  - including a short follow-up or caveat;
- links to useful references; and
- questions I want to revisit.

A normal writing workflow is similarly small:

1. Write a Markdown file.
2. Preview the site with `npm run dev`.
3. Build it with `npm run build` and run `npx astro check`.
4. Commit the finished post.
5. Push it to GitHub.

> A note does not have to be long. It only has to be useful when I find it again.

---

## Code

Fenced blocks can identify their language so examples remain readable. Here is a small Python function:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"


print(greet("Irene"))
```

TypeScript can show the shape of a value as well as the operation performed on it:

```typescript
type Note = {
  title: string;
  published: boolean;
};

const describe = (note: Note): string =>
  `${note.title}: ${note.published ? "published" : "draft"}`;
```

And a short shell block can record the local checks for a post:

```bash
npm run dev
npm run build
npx astro check
```

Inline code is also useful when writing about syntax such as `<Component />`, `{ value: true }`, or a comparison like `a > b`. A draft can stay out of the published site with `draft: true`.

## Tables and images

A small table can make a compact comparison easier to scan.

| Format | Useful for |
| --- | --- |
| Paragraph | Normal writing |
| List | Related ideas or steps |
| Quote | A thought worth separating |
| Code | Commands and examples |

Images can be added later with normal Markdown syntax such as `![Alt text](/path/to/image.png)`. Captions can wait until there is a real need for them.

## A starting point

This covers the elements I expect to use most often. Future posts can be shorter and more focused; they do not need to demonstrate everything at once.
