'use client'
import { type ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'

type Props = ComponentPropsWithRef<'main'> & {
   className?: string
}

export function PageContainer({ className, ...rest }: Props) {
   const classNames = clsx('mx-auto w-full', 'max-w-[1280px] py-6 px-[60px]', className)

   return <main className={classNames} {...rest} />
}
