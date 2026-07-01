import { AstroError } from 'astro/errors'

export function throwPluginError(message: string): never {
  throw new AstroError(
    message,
    'See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/HiDeoo/starlight-heading-badges/issues/new/choose',
  )
}
