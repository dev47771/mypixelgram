import { useGetUserPostsInfiniteQuery } from '@/features/posts/api'
import { useInfiniteScroll } from '@/shared/hooks'
import { useCallback } from 'react'
import { PostsGrid } from '@/features/posts/ui/ProfilePosts'

type Props = {
   login: string
   onOpenPost: (id: string) => void
}

export const UserProfilePrivatePosts = ({ login, onOpenPost }: Props) => {
   const { data, hasNextPage, isFetching, fetchNextPage } = useGetUserPostsInfiniteQuery({ login })

   const loadMore = useCallback(() => {
      if (hasNextPage && !isFetching) fetchNextPage()
   }, [hasNextPage, isFetching, fetchNextPage])

   const observerRef = useInfiniteScroll(loadMore, { rootMargin: '100px' })

   const posts = data?.pages.flatMap(page => page.publications.map(pub => pub)) ?? []

   return (
      <div className="mt-12">
         <PostsGrid posts={posts} onOpenPost={onOpenPost} />
         <div ref={observerRef} className="h-6" />
      </div>
   )
}
