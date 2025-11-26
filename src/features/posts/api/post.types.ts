import type { UserType } from '@/entities/user'

export type CreatePostRequest = {
   description?: string
   location?: string
   filesId: string[]
}

export type UploadFileItem = {
   url: string
   fileId: string
}

export type UploadFileResponse = {
   data: UploadFileItem[]
}

export type CreatePostResponse = {
   postId: string
   description: string | null
   location: string | null
   createdAt: string
   files: UploadFileResponse[]
}

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
