'use client'
import {GetUserPostsInfiniteResponse, useGetUserPostsInfiniteQuery } from '@/features/posts/api'
import { useInfiniteScroll } from '@/shared/hooks'
import { useCallback } from 'react'
import { PostsGrid } from '@/features/posts/ui/ProfilePosts'


type Props = {
    postsResponse: GetUserPostsInfiniteResponse
}

export const UserProfilePrivatePosts = ({  postsResponse }: Props) => {


    const { data, hasNextPage, isFetching, fetchNextPage } = useGetUserPostsInfiniteQuery({ login: 'login' })
    const onOpenPost =(id: string) => {}
   const loadMore = useCallback(() => {
      if (hasNextPage && !isFetching) fetchNextPage()
   }, [hasNextPage, isFetching, fetchNextPage])

   const observerRef = useInfiniteScroll(loadMore, { rootMargin: '100px' })
    const dataRes = data ?? postsResponse.publications
   const posts = data?.pages.flatMap(page => page.publications.map(pub => pub)) ?? []

   return (
      <div className="mt-12">
         <PostsGrid posts={posts} onOpenPost={onOpenPost} />
         <div ref={observerRef} className="h-6" />
      </div>
   )
}
