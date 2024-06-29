import 'mdast-util-directive'

import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

export function remarkStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    visit(tree, (node, index, parent) => {
      // TODO(HiDeoo) only in heading
      // TODO(HiDeoo) only tag directive
      // TODO(HiDeoo) only valid variant
      // TODO(HiDeoo) can we skip the variant?

      if (node.type === 'textDirective') {
        console.error('🚨 [remark.ts:12] node:', node)

        // TODO(HiDeoo) refactor
        if (typeof index === 'number' && parent && node.name === 'abbr') {
          parent.children.splice(index, 1)
        }
      }
    })
  }
}
