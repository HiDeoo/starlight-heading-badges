import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import type { AstroIntegration } from 'astro'

import { rehypeStarlightHeadingBadges } from './rehype'
import { remarkStarlightHeadingBadges } from './remark'

export function starlightHeadingBadgesIntegration(): AstroIntegration {
  return {
    name: 'starlight-heading-badges-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            rehypePlugins: [rehypeHeadingIds, rehypeStarlightHeadingBadges],
            remarkPlugins: [remarkStarlightHeadingBadges],
          },
        })
      },
    },
  }
}
