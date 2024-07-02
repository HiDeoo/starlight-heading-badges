import 'mdast-util-directive'

import type { ElementContent, Root } from 'hast'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

import { deserializeBadge, type Badge } from './badge'

export function rehypeStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    visit(tree, (node, index, parent) => {
      if (node.type === 'text') {
        if (index === undefined || !parent) return CONTINUE

        const badge = deserializeBadge(node.value)
        if (!badge) return SKIP

        if (badge.heading) {
          node.value = badge.heading
          parent.children.splice(index + 1, 0, createBadgeNode(badge))
        } else {
          parent.children.splice(index, 1, createBadgeNode(badge))
        }

        return SKIP
      }

      return CONTINUE
    })
  }
}

function createBadgeNode(badge: Badge): ElementContent {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      'data-shb-badge': '',
      'data-shb-badge-variant': badge.variant,
    },
    children: [{ type: 'text', value: badge.text }],
  }
}
