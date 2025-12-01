'use client'
import {
   CreatePostRequest,
   CreatePostResponse,
   GetUserPostsInfiniteResponse,
   GetUserPublicPostsResponse,
   UploadFileResponse,
   PostByIdType,
} from './post.types'
import { PublicPostsEndpoints } from '@/shared/enums'
import {PostsEndpoints} from "@/features/posts/api/postsEndpoints";
import {baseApi} from "@/shared/store";




const postService = baseApi.injectEndpoints({
   endpoints: builder => ({
      getUserPosts: builder.infiniteQuery<
         GetUserPostsInfiniteResponse,
         { login: string },
         string | undefined
      >({
         infiniteQueryOptions: {
            initialPageParam: undefined,
            getNextPageParam: lastPage => {
               return lastPage?.pageInfo.nextCursor
            },
         },
         query: ({ queryArg, pageParam }) => ({
            url: `${PostsEndpoints.userPosts}/${queryArg.login}`,
            params: pageParam ? { cursor: pageParam } : undefined,
         }),
         providesTags: ['getPosts'],
      }),
      getUserPublicPosts: builder.query<GetUserPublicPostsResponse, string>({
         query: login => `${PublicPostsEndpoints.publicPosts}/${login}`,
      }),
      uploadFile: builder.mutation<UploadFileResponse, File[]>({
         query: files => {
            const formData = new FormData()

            files.forEach(file => formData.append('post images', file))
            formData.append('type', 'post')

            return {
               url: '/files/upload-file',
               method: 'POST',
               body: formData,
            }
         },
      }),

      createPostData: builder.mutation<CreatePostResponse, CreatePostRequest>({
         query: postData => ({
            url: '/posts',
            method: 'POST',
            body: postData,
         }),
         invalidatesTags: ['getPosts'],
      }),

      getPostById: builder.query<PostByIdType, string>({
         query: postId => ({
            url: `/public/posts/${postId}`,
         }),
      }),

      deletePost: builder.mutation<void, string>({
         query: postId => ({
            url: `/posts/${postId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['getPosts'],
      }),
   }),
})

export const {
   useUploadFileMutation,
   useCreatePostDataMutation,
   useGetPostByIdQuery,
   useDeletePostMutation,
   useGetUserPublicPostsQuery,
   useGetUserPostsInfiniteQuery,
} = postService
