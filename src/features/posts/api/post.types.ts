export type UploadPostRequest = {
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

export type PostFile = {
   url: string
   fileId: string
}

export type CreatePostResponse = {
   postId: string
   description: string | null
   location: string | null
   createdAt: string
   files: PostFile[]
}
