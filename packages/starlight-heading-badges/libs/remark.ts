import 'mdast-util-directive'

import type { Root } from 'mdast'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

export function remarkStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    visit(tree, (node, index, parent) => {
      if (node.type !== 'textDirective') return CONTINUE
      if (!parent || typeof index !== 'number' || parent.type !== 'heading') return CONTINUE

      // TODO(HiDeoo) only tag directive
      if (node.name !== 'abbr') return CONTINUE

      // TODO(HiDeoo) can we make the variant optional in the directive syntax?
      // TODO(HiDeoo) error on invalid variant

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

      // TODO(HiDeoo) identifier with directive data + values
      // TODO(HiDeoo) Always insert badge at the end
      // TODO(HiDeoo) handle spaces
      parent.children.splice(index, 1, { type: 'html', value: '<span data-heading-badge>__IDENTIFIER__</span>' })

      return SKIP
    })
  }
}
