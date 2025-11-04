//примерный тип
export type Post = {
   id: string
   userId: string
   userName: string
   userAvatar: string
   description: string
   images: string[]
   likesCount: number
   dateCreated: string
   comments?: any
   isLiked?: boolean
}
