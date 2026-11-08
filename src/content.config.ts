import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './blogs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional(),
    tag: z.string().optional(),
    number: z.number().optional(),
  }),
});

export const collections = { blog };
