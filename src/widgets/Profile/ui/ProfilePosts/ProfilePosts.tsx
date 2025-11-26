import { useGetUserPostsInfiniteQuery, useGetUserPublicPostsQuery } from '@/features/posts/api'
import { useMeQuery } from '@/features/auth/api'
import { useCallback } from 'react'
import { PostPreview } from '@/entities/posts/ui/PostPreview'
import { usePathname, useRouter } from 'next/navigation'
import { useCreateQueryString, useInfiniteScroll } from '@/shared/hooks'

type Props = {
   login: string
}

export const ProfilePosts = ({ login }: Props) => {
   const router = useRouter()
   const pathname = usePathname()
   const createQueryString = useCreateQueryString()

   const { data: me } = useMeQuery()
   const { data: publicPosts } = useGetUserPublicPostsQuery(login)

   const {
      data: posts,
      hasNextPage,
      isFetching,
      fetchNextPage,
   } = useGetUserPostsInfiniteQuery(
      {
         login,
      },
      {
         skip: !me,
      }
   )

   const loadMoreHandler = useCallback(() => {
      if (hasNextPage && !isFetching) {
         fetchNextPage()
      }
   }, [hasNextPage, isFetching, fetchNextPage])

   const observerRef = useInfiniteScroll(loadMoreHandler, { rootMargin: '100px' })

   const privatePosts = posts?.pages.flatMap(page => page.publications.map(pub => pub)) ?? []

   const openPostHandler = (postId: string) => {
      router.push(pathname + '?' + createQueryString('postId', postId))
   }

   return (
      <div className={'mt-12'}>
         <div className={'grid grid-cols-[repeat(auto-fill,230px)] gap-4'}>
            {me
               ? privatePosts.map(post => (
                    <PostPreview
                       key={post.postId}
                       postId={post.postId}
                       firstFileUrl={post.firstFileUrl}
                       onOpenPost={openPostHandler}
                    />
                 ))
               : publicPosts?.map(post => (
                    <PostPreview
                       key={post.postId}
                       postId={post.postId}
                       firstFileUrl={post.files[0].url}
                       onOpenPost={openPostHandler}
                    />
                 ))}
         </div>

         <div ref={observerRef} className={'h-6'}></div>
      </div>
   )
}
