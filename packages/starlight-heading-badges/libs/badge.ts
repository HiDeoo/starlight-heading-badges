export const BadgeDirectiveName = 'badge'

const variants = ['caution', 'danger', 'default', 'note', 'success', 'tip'] as const

const serializedBadgeDelimiter = '__SHB__'
const serializedBadgeSpaceDelimiter = '__SHB_SPACE__'

export function isBadgeVariant(value: string): value is Variant {
  return variants.includes(value as Variant)
}

export function serializeBadge(variant: Variant, text: string) {
  return [
    serializedBadgeDelimiter,
    variant,
    serializedBadgeDelimiter,
    text.replaceAll(' ', serializedBadgeSpaceDelimiter),
    serializedBadgeDelimiter,
  ].join('')
}

export function deserializeBadges(value: string): Badge[] {
  const badges: Badge[] = []

  const parts = value.split(' ').reverse()

  for (const part of parts) {
    const badge = deserializeBadge(value, part)
    if (!badge) break
    badges.unshift(badge)
  }

  return badges
}

function deserializeBadge(heading: string, value: string): Badge | undefined {
  const parts = value.split(serializedBadgeDelimiter)
  const [, variant, text] = parts

  if (!variant || !isBadgeVariant(variant) || !text) return undefined

  return {
    heading: heading.replace(new RegExp(`${serializedBadgeDelimiter}.*${serializedBadgeDelimiter}`), ''),
    text: text.replaceAll(serializedBadgeSpaceDelimiter, ' '),
    variant,
  }
}

export type Variant = (typeof variants)[number]

export interface Badge {
  heading: string
  text: string
  variant: Variant
}
