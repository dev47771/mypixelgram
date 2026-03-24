import { AuthEndpoints, PostsEndpoints, PublicPostsEndpoints, UserEndpoints } from '@/shared/enums'

export const TOKEN = 'accessToken'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const API_URLS = {
   loginGoogle: `${BASE_URL}${AuthEndpoints.loginGoogle}`,
   loginGitHub: `${BASE_URL}${AuthEndpoints.loginGitHub}`,
   lastPosts: `${BASE_URL}${PublicPostsEndpoints.lastPosts}`,
   usersTotalCount: `${BASE_URL}${UserEndpoints.usersTotalCount}`,
   getPostById: (postId: string) => `${BASE_URL}/public/posts/${postId}`,
   userProfile: (login: string) => `${BASE_URL}${UserEndpoints.userProfile}/${login}`,
   userPublicPosts: (login: string) => `${BASE_URL}${PublicPostsEndpoints.publicPosts}/${login}`,
   userPrivatePosts: (login: string) => `${BASE_URL}${PostsEndpoints.userPosts}/${login}`,
}
