import type { StarlightPlugin } from '@astrojs/starlight/types'

import { starlightHeadingBadgesIntegration } from './libs/integration'
import { overrideComponents } from './libs/plugin'

export default function starlightHeadingBadgesPlugin(): StarlightPlugin {
  return {
    name: 'starlight-heading-badges-plugin',
    hooks: {
      setup({ addIntegration, config: starlightConfig, logger, updateConfig }) {
        addIntegration(starlightHeadingBadgesIntegration())

        updateConfig({
          components: overrideComponents(
            starlightConfig,
            [
              { name: 'MobileTableOfContents', fallback: 'HeadingBadgesMobileTableOfContents' },
              { name: 'TableOfContents', fallback: 'HeadingBadgesTableOfContents' },
            ],
            logger,
          ),
          customCss: [...(starlightConfig.customCss ?? []), 'starlight-heading-badges/styles.css'],
        })
      },
    },
  }
}
