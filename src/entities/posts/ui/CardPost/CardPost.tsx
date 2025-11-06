import { Card } from '@/shared/components/Card'
import { Slider } from '@/shared/components/Slider'
import { PostOutlineIcon } from '@/shared/icons'
import Image from 'next/image'
import { Typography } from '@/shared/components/Typography'

export type PostProps = {
   postId: string
   description: string | null
   location: string | null
   file: { url: string }
   createdAt: string
   user: {
      userId: string
      userName: string
      avatar: string | null
   }
}

//const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

export const CardPost = ({ description, file, createdAt, user }: PostProps) => {
   const createdAtPost = new Date(createdAt).toLocaleString('en-EN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   })

   const images = [file.url, file.url, file.url]

   return (
      <Card withBaseStyles={false} className="h-[391px] w-[234px] overflow-hidden">
         {file?.url && (
            //   <div className="relative h-[240px] w-[234px]">
            //       <Image src={file.url} alt="post" className="object-cover" sizes="234px" fill />
            //    </div>
            <Slider images={images} className={'mb-3 h-[240px] w-[234px]'} />
         )}

         <div className="mb-3 flex flex-col gap-2 text-sm text-white">
            <div className="flex items-center gap-3">
               {user.avatar ? (
                  <Image
                     src={user.avatar}
                     alt={user.userName}
                     width={32}
                     height={32}
                     className="rounded-full object-cover"
                  />
               ) : (
                  <div
                     className={
                        'bg-dark-100 flex h-[32px] w-[32px] items-center justify-center rounded-full'
                     }
                  >
                     <PostOutlineIcon width={20} height={20} />
                  </div>
               )}
               <Typography as="span" variant="h3">
                  {user.userName}
               </Typography>
            </div>
            <Typography as="span" variant="smallRegular" className="text-light-900">
               {createdAtPost}
            </Typography>
         </div>

         <div>{description && <Typography variant="captionRegular">{description}</Typography>}</div>
      </Card>
   )
}
