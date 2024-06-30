import 'mdast-util-directive'

import type { Root } from 'hast'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

import { deserializeBadge } from './badge'

export function rehypeStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'span') return CONTINUE
      if (node.properties['dataShbBadge'] === undefined) return CONTINUE

      const badgeNode = node.children[0]
      if (!badgeNode || badgeNode.type !== 'text' || badgeNode.value.length === 0) return CONTINUE

      const badge = deserializeBadge(badgeNode.value)

      if (!badge) return SKIP

      node.properties['data-shb-badge-variant'] = badge.variant
      badgeNode.value = badge.text

      return SKIP
    })
  }
}
