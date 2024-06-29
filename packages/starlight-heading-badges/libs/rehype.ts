import 'mdast-util-directive'

import type { Root } from 'hast'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

export function rehypeStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'span') return CONTINUE
      if (node.properties['dataHeadingBadge'] === undefined) return CONTINUE

      // WILO
      // TODO(HiDeoo)

      return SKIP
    })
  }
}
