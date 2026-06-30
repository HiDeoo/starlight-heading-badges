import type { AstroIntegration } from 'astro'

import { applyMarkdownPlugin } from './processor'

export function starlightHeadingBadgesIntegration(): AstroIntegration {
  return {
    name: 'starlight-heading-badges-integration',
    hooks: {
      'astro:config:setup': ({ config }) => {
        applyMarkdownPlugin(config.markdown.processor)
      },
    },
  }
}
