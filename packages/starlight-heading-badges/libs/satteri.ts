import { satteriHeadingIdsPlugin, type SatteriAstroData } from '@astrojs/markdown-satteri'
import GithubSlugger from 'github-slugger'
import type { ElementContent } from 'hast'
import type { PhrasingContent } from 'mdast'
import { defineHastPlugin, defineMdastPlugin, type HastPluginDefinition, type MdastPluginDefinition } from 'satteri'

import {
  BadgeDirectiveName,
  deserializeBadges,
  isBadgeVariant,
  serializeBadge,
  type Badge,
  type Variant,
} from './badge'

const trailingWhitespaceRegex = /\s$/
const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const astroHeadingsLock = Symbol('starlightHeadingBadgesAstroHeadingsLock')

export const satteriHastStarlightHeadingBadgesPlugins = [
  satteriHastNormalizeHeadingIds,
  satteriHeadingIdsPlugin,
  satteriHastStarlightHeadingBadges,
]

export function satteriMdastStarlightHeadingBadges(): MdastPluginDefinition {
  return defineMdastPlugin({
    name: 'starlight-heading-badges-mdast',
    heading(node, ctx) {
      const children = transformMdastHeadingChildren(node.children)
      if (children) ctx.setProperty(node, 'children', children)
    },
  })
}

function transformMdastHeadingChildren(children: PhrasingContent[]) {
  let didFindBadge = false
  const content: PhrasingContent[] = []
  const serializedBadges: string[] = []

  for (const child of children) {
    const serializedBadge = serializeBadgeDirective(child)

    if (serializedBadge) {
      didFindBadge = true
      serializedBadges.push(serializedBadge)
    } else {
      content.push(child)
    }
  }

  if (!didFindBadge) return

  for (const serializedBadge of serializedBadges) {
    const lastContent = content.at(-1)

    if (lastContent?.type === 'text' && !trailingWhitespaceRegex.test(lastContent.value)) {
      content.push({ type: 'text', value: ' ' })
    }

    content.push({ type: 'text', value: serializedBadge })
  }

  return content
}

function serializeBadgeDirective(node: PhrasingContent) {
  if (node.type !== 'textDirective' || node.name !== BadgeDirectiveName) return

  const contentNode = node.children[0]
  if (contentNode?.type !== 'text' || contentNode.value.length === 0) return

  let variant: Variant = 'default'

  if (node.attributes?.['variant']) {
    if (isBadgeVariant(node.attributes['variant'])) {
      variant = node.attributes['variant']
    } else {
      return
    }
  }

  return serializeBadge(variant, contentNode.value)
}

export function satteriHastNormalizeHeadingIds(): HastPluginDefinition {
  const slugger = new GithubSlugger()

  return defineHastPlugin({
    name: 'starlight-heading-badges-hast-normalize-heading-ids',
    element: {
      filter: headingTags,
      visit(node, ctx) {
        if (typeof node.properties['id'] === 'string') return

        const serializedHeadingText = ctx.textContent(node)
        const badges = deserializeBadges(serializedHeadingText)

        const headingText = (badges[0]?.heading ?? serializedHeadingText).trim()
        if (!headingText) return

        ctx.setProperty(node, 'id', slugger.slug(headingText))
      },
    },
  })
}

export function satteriHastStarlightHeadingBadges(): HastPluginDefinition {
  return defineHastPlugin({
    name: 'starlight-heading-badges-hast',
    element: {
      filter: headingTags,
      visit(node, ctx) {
        const badges = deserializeBadges(ctx.textContent(node))
        if (badges.length === 0) return

        lockAstroHeadings(ctx.data)

        const children = transformHastHeadingChildren(node.children)
        if (children) ctx.setProperty(node, 'children', children)
      },
    },
  })
}

function transformHastHeadingChildren(children: ElementContent[]) {
  let didFindBadge = false
  const content: ElementContent[] = []

  for (const child of children) {
    if (child.type !== 'text') {
      content.push(child)
      continue
    }

    const badges = deserializeBadges(child.value)

    if (badges.length === 0) {
      content.push(child)
      continue
    }

    didFindBadge = true

    if (badges[0]?.heading) {
      content.push({ type: 'text', value: badges[0].heading })
    }

    for (const badge of badges) {
      content.push(...createBadgeNode(badge))
    }
  }

  return didFindBadge ? content : undefined
}

function createBadgeNode(badge: Badge): ElementContent[] {
  return [
    {
      type: 'element',
      tagName: 'span',
      properties: {
        'data-shb-badge': '',
        'data-shb-badge-variant': badge.variant,
      },
      children: [{ type: 'text', value: badge.text }],
    },
    {
      type: 'text',
      value: ' ',
    },
  ]
}

function lockAstroHeadings(data: SatteriData) {
  const isLocked = data[astroHeadingsLock]
  if (isLocked) return

  const astroData = data['astro']
  if (!isAstroData(astroData)) return

  const collectedHeadings = astroData.headings

  Object.defineProperty(astroData, 'headings', {
    configurable: true,
    enumerable: true,
    get() {
      return collectedHeadings
    },
    set() {
      // Astro collects headings after user HAST plugins. We ignore that later collection and preserve the headings
      // collected before rendering badges so that ToC metadata keeps serialized badge markers instead of rendered badge
      // text.
    },
  })

  data[astroHeadingsLock] = true
}

function isAstroData(value: unknown): value is { headings: SatteriAstroData['headings'] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'headings' in value &&
    Array.isArray((value as { headings?: unknown }).headings)
  )
}

type SatteriData = Record<PropertyKey, unknown>
