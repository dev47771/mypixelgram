'use client'
import {
   GetUserPostsInfiniteResponse,
   postService,
   useGetUserPostsInfiniteQuery,
} from '@/features/post/api'
import { useAppDispatch, useInfiniteScroll } from '@/shared/hooks'
import { useCallback, useEffect, useState } from 'react'
import { PostsGrid } from '@/features/post/ui/ProfilePosts'
import { Button } from '@/shared/components/Button'
import { cn } from '@/shared/lib'
import { useAppSelector } from '@/shared/store'

type Props = {
   postsResponse: GetUserPostsInfiniteResponse
   login: string
}

export const UserProfilePrivatePosts = ({ login, postsResponse }: Props) => {
   const dispatch = useAppDispatch()
   const dataFromCache = useAppSelector(
      state => postService.endpoints.getUserPosts.select({ login })(state).data
   )

   const [showScrollTop, setShowScrollTop] = useState(false)
   const [skip, setSkip] = useState(true)
   const { data, hasNextPage, isFetching, fetchNextPage } = useGetUserPostsInfiniteQuery(
      { login },
      { skip }
   )

   useEffect(() => {
      if (dataFromCache?.pages.length) {
         setSkip(false)
         return
      }
      if (skip) {
         dispatch(
            postService.util.upsertQueryData(
               'getUserPosts',
               { login },
               {
                  pages: [postsResponse],
                  pageParams: [undefined],
               }
            )
         )
         setSkip(false)
      }
   }, [dispatch, login, postsResponse, skip, dataFromCache?.pages.length])

   useEffect(() => {
      const handler = () => {
         if (window.scrollY > 600) {
            setShowScrollTop(true)
         } else {
            setShowScrollTop(false)
         }
      }

      window.addEventListener('scroll', handler)
      return () => window.removeEventListener('scroll', handler)
   }, [])

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   const loadMore = useCallback(() => {
      if (hasNextPage && !isFetching) {
         fetchNextPage()
      }
   }, [hasNextPage, isFetching, fetchNextPage])

   const observerRef = useInfiniteScroll(loadMore, { rootMargin: '100px' })

   const allPosts = data?.pages.flatMap(page => page.publications) ?? postsResponse.publications

   return (
      <div className="mt-12">
         <PostsGrid posts={allPosts} />
         <div ref={observerRef} className="h-6" />
         <Button
            onClick={scrollToTop}
            className={cn(
               'fixed right-6 bottom-6 z-50 transition-all duration-300',
               showScrollTop
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0'
            )}
         >
            Scroll to top
         </Button>
      </div>
   )
}
