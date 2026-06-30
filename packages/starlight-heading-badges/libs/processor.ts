import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import type { AstroConfig } from 'astro'

import { throwPluginError } from './error'
import { rehypeStarlightHeadingBadges } from './rehype'
import { remarkStarlightHeadingBadges } from './remark'
// import { satteriStarlightLinksValidator } from './satteri'

export function applyMarkdownPlugin(processor: MarkdownProcessor) {
  if (isSatteriProcessor(processor)) {
    // TODO(HiDeoo)
    // processor.options.hastPlugins.push(satteriStarlightLinksValidator(validationConfig))
  } else if (isUnifiedProcessor(processor)) {
    processor.options.remarkPlugins.push([remarkStarlightHeadingBadges])
    processor.options.rehypePlugins.push([rehypeHeadingIds], [rehypeStarlightHeadingBadges])
  } else {
    throwPluginError("The configured 'markdown.processor' is not supported by the starlight-heading-badges plugin.")
  }
}

function isSatteriProcessor(processor: unknown): processor is SatteriMarkdownProcessor {
  if (typeof processor !== 'object' || processor === null) return false
  const candidate = processor as { name?: unknown; options?: { hastPlugins?: unknown; mdastPlugins?: unknown[] } }
  return (
    candidate.name === 'satteri' &&
    Array.isArray(candidate.options?.hastPlugins) &&
    Array.isArray(candidate.options.mdastPlugins)
  )
}

function isUnifiedProcessor(processor: unknown): processor is UnifiedMarkdownProcessor {
  if (typeof processor !== 'object' || processor === null) return false
  const candidate = processor as { name?: unknown; options?: { rehypePlugins?: unknown; remarkPlugins: unknown[] } }
  return (
    candidate.name === 'unified' &&
    Array.isArray(candidate.options?.rehypePlugins) &&
    Array.isArray(candidate.options.remarkPlugins)
  )
}

type MarkdownProcessor = NonNullable<AstroConfig['markdown']['processor']>

interface SatteriMarkdownProcessor {
  name: string
  options: { hastPlugins: unknown[]; mdastPlugins?: unknown[] }
}

interface UnifiedMarkdownProcessor {
  name: string
  options: { rehypePlugins: unknown[]; remarkPlugins: unknown[] }
}
