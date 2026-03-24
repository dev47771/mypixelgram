import { UserType } from '@/entities/user'
import { UploadFileItem } from '@/shared/api'

export type PostByIdType = {
   postId: string
   user: UserType
   description: string
   location: string | null
   likesCount: number
   userLikeStatus: 'None' | 'Like'
   createdAt: string
   updatedAt: string
   images: UploadFileItem[]
}
