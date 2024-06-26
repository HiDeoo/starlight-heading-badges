import type { StarlightPlugin } from '@astrojs/starlight/types'

export default function starlightHeadingBadgesPlugin(): StarlightPlugin {
  return {
    name: 'starlight-heading-badges-plugin',
    hooks: {
      setup() {
        console.error('Hello from starlight-heading-badges-plugin!')
      },
    },
  }
}
