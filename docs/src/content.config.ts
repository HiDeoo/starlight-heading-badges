import { docsSchema } from '@astrojs/starlight/schema'
import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

const isUnifiedProcessor = process.env['STARLIGHT_HEADING_BADGES_TEST_MARKDOWN_PROCESSOR'] === 'unified'

export const collections = {
  docs: defineCollection({
    loader: glob({
      base: './src/content/docs',
      // Sätteri does not support yet heading attributes in MDX, so we omit the MDX test file when using Sätteri.
      pattern: ['**/[^_]*.{md,mdx}', ...(isUnifiedProcessor ? [] : ['!tests/test-mdx-custom-ids.mdx'])],
    }),
    schema: docsSchema(),
  }),
}
