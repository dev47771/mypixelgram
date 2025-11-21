import { AuthEndpoints, PostsEndpoints } from '../enums'

export const TOKEN = 'accessToken'

export const apiMap = {
   loginGoogle: `${process.env.NEXT_PUBLIC_BASE_URL}${AuthEndpoints.loginGoogle}`,
   loginGitHub: `${process.env.NEXT_PUBLIC_BASE_URL}${AuthEndpoints.loginGitHub}`,
   lastPosts: `${process.env.NEXT_PUBLIC_BASE_URL}${PostsEndpoints.lastPosts}`,
} as const
