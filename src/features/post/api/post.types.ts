import { UserType } from '@/entities/user/api'

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

export type UpdatePostRequest = {
   location: string
   postId: string
   description: string
}

export type PostFile = {
   url: string
   fileId: string
}

export type Post = {
   postId: string
   description: string | null
   location: string | null
   createdAt: string
   files: PostFile[]
}

export type PageInfo = {
   nextCursor: string | null
   hasMore: boolean
}

export type Publication = {
   postId: string
   firstFileUrl: string | null
}

export type GetUserPublicPostsResponse = Post[]
export type GetUserPostsInfiniteResponse = {
   publications: Publication[]
   pageInfo: PageInfo
}
