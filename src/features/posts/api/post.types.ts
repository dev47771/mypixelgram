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

export type PostFile = {
   url: string
   fileId: string
}

export type Post = {
   postId: string
   description: string
   location: string
   createdAt: string
   files: PostFile[]
}

export type PageInfo = {
   nextCursor: string
   hasMore: boolean
}

export type Publication = {
   postId: string
   firstFileUrl: string
}

export type GetUserPublicPostsResponse = Post[]
export type GetUserPostsInfiniteResponse = {
   publications: Publication[]
   pageInfo: PageInfo
}
