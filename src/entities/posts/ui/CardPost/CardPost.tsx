import { Card } from '@/shared/components/Card'
import { Slider } from '@/shared/components/Slider'
import Image from 'next/image'

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

export const CardPost = ({ description, location, file, createdAt, user }: PostProps) => {
   const createdAtPost = new Date(createdAt).toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   })

   const images = [file.url]

   return (
      <Card className="bg-dark-500 h-[391px] w-[234px] overflow-hidden">
         {file?.url && (
            //   <div className="relative h-[240px] w-[234px]">
            //       <Image src={file.url} alt="post" className="object-cover" sizes="234px" fill />
            //    </div>
            <Slider images={images} className={'h-[240px] w-[234px]'} />
         )}

         {/* Информация о пользователе */}
         <div className="flex items-center gap-2 p-2 text-sm text-white">
            {user.avatar && (
               <Image
                  src={user.avatar}
                  alt={user.userName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
               />
            )}
            <div className="flex flex-col">
               <span className="font-medium">{user.userName}</span>
               <span className="text-xs text-gray-400">{createdAtPost}</span>
            </div>
         </div>

         {/* Описание поста */}
         <div className="p-2 text-sm text-gray-400">
            {description && <p>{description}</p>}
            {location && <p className="text-xs text-gray-500">{location}</p>}
         </div>
      </Card>
   )
}
