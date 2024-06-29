import type { AstroIntegration } from 'astro'

import { remarkStarlightHeadingBadges } from './remark'

export function starlightHeadingBadgesIntegration(): AstroIntegration {
  return {
    name: 'starlight-heading-badges-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkStarlightHeadingBadges],
          },
        })
      },
    },
  }
}
