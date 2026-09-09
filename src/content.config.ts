import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['devlog', 'essay']),
    tags: z.array(z.string()).default([]),
    // Reserved for a future /games section: groups devlogs under a game.
    // No UI renders this field yet.
    game: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/albums' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      cover: image(),
      tags: z.array(z.string()).default([]),
      photos: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .nonempty(),
    }),
});

export const collections = { blog, albums };
