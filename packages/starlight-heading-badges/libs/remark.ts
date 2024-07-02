import 'mdast-util-directive'

import GithubSlugger from 'github-slugger'
import type { Root } from 'mdast'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

import { BadgeDirectiveName, isBadgeVariant, serializeBadge, type Variant } from './badge'

export function remarkStarlightHeadingBadges() {
  return function transformer(tree: Root) {
    const slugger = new GithubSlugger()

    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number' || parent.type !== 'heading') return CONTINUE

      if (index === 0) {
        let headingText = ''

        visit(parent, (headingNode, _, headingParent) => {
          if (
            headingParent?.type !== 'textDirective' &&
            (headingNode.type === 'text' || headingNode.type === 'inlineCode')
          ) {
            headingText += headingNode.value
          }
        })

        headingText = headingText.trim()

        if (!headingText) return CONTINUE

        parent.data ??= {}
        parent.data.hProperties ??= {}
        parent.data.hProperties['id'] = slugger.slug(headingText)
      }

      if (node.type !== 'textDirective' || node.name !== BadgeDirectiveName) return CONTINUE

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

      if (parent.children.length !== index + 1) {
        parent.children.splice(parent.children.length, 0, { type: 'text', value: ' ' })
      }
      parent.children.splice(index, 1)
      parent.children.splice(parent.children.length, 0, {
        type: 'text',
        value: serializeBadge(variant, contentNode.value),
      })

      return SKIP
    })
  }
}
