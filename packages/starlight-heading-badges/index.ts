import type { StarlightPlugin } from '@astrojs/starlight/types'

import { starlightHeadingBadgesIntegration } from './libs/integration'

export default function starlightHeadingBadgesPlugin(): StarlightPlugin {
  return {
    name: 'starlight-heading-badges-plugin',
    hooks: {
      setup({ addIntegration }) {
        addIntegration(starlightHeadingBadgesIntegration())
      },
    },
  }
}
