export const BadgeDirectiveName = 'badge'

const variants = ['caution', 'danger', 'default', 'note', 'success', 'tip'] as const

const serializedBadgeDelimiter = '__SHB__'

export function isBadgeVariant(value: string): value is Variant {
  return variants.includes(value as Variant)
}

export function serializeBadge(variant: Variant, text: string) {
  return [serializedBadgeDelimiter, variant, serializedBadgeDelimiter, text, serializedBadgeDelimiter].join('')
}

export function deserializeBadge(value: string): Badge | undefined {
  const parts = value.split(serializedBadgeDelimiter)
  const [, variant, text] = parts

  if (!variant || !isBadgeVariant(variant) || !text) return undefined

  return {
    heading: value.replace(new RegExp(`${serializedBadgeDelimiter}.*${serializedBadgeDelimiter}`), '').trim(),
    text,
    variant,
  }
}

export type Variant = (typeof variants)[number]

interface Badge {
  heading: string
  text: string
  variant: Variant
}
