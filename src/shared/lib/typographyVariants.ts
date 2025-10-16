export const typographyVariants = [
   'large',
   'h1',
   'h2',
   'h3',
   'bodyRegular',
   'bodyBold',
   'captionRegular',
   'captionMedium',
   'captionBold',
   'smallRegular',
   'smallBold',
   'linkRegular',
   'linkSmall',
] as const

export type TypographyVariant = (typeof typographyVariants)[number]
