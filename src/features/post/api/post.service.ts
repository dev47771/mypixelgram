'use client'
import {
   CreatePostRequest,
   CreatePostResponse,
   GetUserPostsInfiniteResponse,
   GetUserPublicPostsResponse,
   PostByIdType,
   UpdatePostRequest,
   UploadFileResponse,
} from './post.types'
import { PublicPostsEndpoints } from '@/shared/enums'
import { PostsEndpoints } from '@/features/post/api/postsEndpoints'
import { baseApi } from '@/shared/store'

export const postService = baseApi.injectEndpoints({
   endpoints: builder => ({
      getUserPosts: builder.infiniteQuery<
         GetUserPostsInfiniteResponse,
         { login: string },
         string | undefined
      >({
         infiniteQueryOptions: {
            initialPageParam: undefined,
            getNextPageParam: lastPage => {
               return lastPage?.pageInfo?.nextCursor
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
         providesTags: ['getPost'],
      }),

      deletePost: builder.mutation<void, string>({
         query: postId => ({
            url: `/posts/${postId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['getPosts'],
      }),

      updatePostData: builder.mutation<void, UpdatePostRequest>({
         query: ({ postId, location, description }) => ({
            url: `/posts/${postId}`,
            method: 'POST',
            body: { location, description },
         }),
         invalidatesTags: ['getPost'],
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
   useUpdatePostDataMutation,
} = postService
