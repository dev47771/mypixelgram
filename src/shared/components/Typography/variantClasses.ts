import { TypographyVariant } from '@/shared/lib'

export const variantClasses: Record<TypographyVariant, string> = {
   large: 'text-xxl font-semibold leading-l',
   h1: 'text-xl font-bold leading-l',
   h2: 'text-l font-bold leading-m',
   h3: 'text-m font-semibold leading-m',
   bodyRegular: 'text-m font-regular leading-m',
   bodyBold: 'text-m font-bold leading-m',
   captionRegular: 'text-s font-regular leading-m',
   captionMedium: 'text-s font-medium leading-m',
   captionBold: 'text-s font-bold leading-m',
   smallRegular: 'text-xs font-regular leading-s',
   smallBold: 'text-xs font-semibold leading-s',
   linkRegular: 'cursor-pointer text-s font-regular text-accent-500 underline leading-m',
   linkSmall: 'cursor-pointer text-s font-regular text-accent-500 underline leading-s',
}
