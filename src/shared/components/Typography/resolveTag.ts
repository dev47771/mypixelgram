import { ElementType } from 'react'
import { TypographyVariant } from '@/shared/lib'
import Link from 'next/link'

export function resolveTypographyTag(
   as: ElementType,
   variant: TypographyVariant = 'bodyRegular'
): ElementType {
   switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
         return as ?? variant
      case 'linkRegular':
      case 'linkSmall':
         return as ?? Link
      case 'large':
      case 'bodyRegular':
      case 'bodyBold':
      case 'captionRegular':
      case 'captionMedium':
      case 'captionBold':
      case 'smallRegular':
      case 'smallBold':
         return as ?? 'p'
      default:
         return exhaustiveCheck(variant)
   }
}

function exhaustiveCheck(value: never): never {
   return value
}
