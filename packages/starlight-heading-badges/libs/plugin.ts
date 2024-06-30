import type { StarlightPlugin } from '@astrojs/starlight/types'
import type { AstroIntegrationLogger } from 'astro'

export function overrideComponents(
  starlightConfig: StarlightUserConfig,
  overrides: ComponentOverride[],
  logger: AstroIntegrationLogger,
): StarlightUserConfig['components'] {
  const components = { ...starlightConfig.components }

  for (const { name, fallback } of overrides) {
    if (starlightConfig.components?.[name]) {
      logger.warn(`A \`<${name}>\` component override is already defined in your Starlight configuration.`)
      logger.warn(
        `To use \`starlight-heading-badges\`, either remove this override or manually render the content from \`starlight-heading-badges/components/${fallback}.astro\`.`,
      )
      continue
    }
    components[name] = `starlight-heading-badges/overrides/${name}.astro`
  }

  return components
}

interface ComponentOverride {
  name: keyof NonNullable<StarlightUserConfig['components']>
  fallback: string
}

type StarlightUserConfig = Parameters<StarlightPlugin['hooks']['setup']>['0']['config']
