import { AuthEndpoints, PostsEndpoints } from '../enums'
import { UserEndpoints } from '@/entities/user/api'

export const TOKEN = 'accessToken'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const apiUrls = {
   loginGoogle: `${BASE_URL}${AuthEndpoints.loginGoogle}`,
   loginGitHub: `${BASE_URL}${AuthEndpoints.loginGitHub}`,
   lastPosts: `${BASE_URL}${PostsEndpoints.lastPosts}`,
   usersTotalCount: `${BASE_URL}${UserEndpoints.usersTotalCount}`,
   getPostById: (postId: string) => `${BASE_URL}/public/posts/${postId}`,
}
