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
  const serializeBadge = value.split(' ').pop()
  if (!serializeBadge) return

  const parts = serializeBadge.split(serializedBadgeDelimiter)
  const [, variant, text] = parts

  if (!variant || !isBadgeVariant(variant) || !text) return undefined

  return {
    heading: value.replace(new RegExp(`${serializedBadgeDelimiter}.*${serializedBadgeDelimiter}`), ''),
    text,
    variant,
  }
}

export type Variant = (typeof variants)[number]

export interface Badge {
  heading: string
  text: string
  variant: Variant
}
