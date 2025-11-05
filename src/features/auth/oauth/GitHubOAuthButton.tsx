import React from 'react'
import { Button } from '@/shared/components/Button'
import { GitHubIcon } from '@/shared/icons'
import { useRouter } from 'next/navigation'
import { AuthEndpoints } from '@/shared/enums'

export const GitHubOAuthButton = () => {
   const router = useRouter()
   const onAuthWithGitHub = () => {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}${AuthEndpoints.loginGitHub}`)
   }
   return (
      <Button variant={'textButton'} onClick={onAuthWithGitHub} className={'p-0'}>
         <GitHubIcon className={'h-[36px] w-[36px]'} />
      </Button>
   )
}
