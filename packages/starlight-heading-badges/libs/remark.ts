import 'mdast-util-directive'

import type { Root } from 'mdast'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

import { BadgeDirectiveName, isBadgeVariant, serializeBadge, type Variant } from './badge'

export function remarkStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    visit(tree, (node, index, parent) => {
      if (node.type !== 'textDirective' || node.name !== BadgeDirectiveName) return CONTINUE
      if (!parent || typeof index !== 'number' || parent.type !== 'heading') return CONTINUE

      const contentNode = node.children[0]
      if (!contentNode || contentNode.type !== 'text' || contentNode.value.length === 0) return CONTINUE

      let variant: Variant = 'default'

      if (node.attributes?.['variant']) {
        if (isBadgeVariant(node.attributes['variant'])) {
          variant = node.attributes['variant']
        } else {
          return CONTINUE
        }
      }

      let headingText = ''

      visit(parent, (headingNode) => {
        if (headingNode.type === 'text' || headingNode.type === 'inlineCode') {
          headingText += headingNode.value
        }
      })

      if (!headingText) return CONTINUE

      parent.data ??= {}
      parent.data.hProperties ??= {}

      // TODO(HiDeoo) slug
      parent.data.hProperties['id'] = headingText

      // TODO(HiDeoo) Always insert badge at the end
      parent.children.splice(index, 1, {
        type: 'html',
        value: `<span data-shb-badge>${serializeBadge(variant, contentNode.value)}</span>`,
      })

      return SKIP
    })
  }
}
