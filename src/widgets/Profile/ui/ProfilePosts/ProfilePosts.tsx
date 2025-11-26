import { useGetUserPostsInfiniteQuery, useGetUserPublicPostsQuery } from '@/features/posts/api'
import { useMeQuery } from '@/features/auth/api'
import { useCallback, useEffect, useRef } from 'react'
import { PostPreview } from '@/entities/posts/ui/PostPreview'
import { usePathname, useRouter } from 'next/navigation'
import { useCreateQueryString } from '@/shared/hooks'

type Props = {
   login: string
}

export const ProfilePosts = ({ login }: Props) => {
   const router = useRouter()
   const pathname = usePathname()
   const createQueryString = useCreateQueryString()

   const { data } = useMeQuery()
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
         skip: !data,
      }
   )
   const observerRef = useRef<HTMLDivElement>(null)

   const loadMoreHandler = useCallback(() => {
      if (hasNextPage && !isFetching) {
         fetchNextPage()
      }
   }, [hasNextPage, isFetching, fetchNextPage])

   const privatePosts = posts?.pages.flatMap(page => page.publications.map(pub => pub)) ?? []

   console.log(privatePosts)

   const openPostHandler = (postId: string) => {
      router.push(pathname + '?' + createQueryString('postId', postId))
   }

   useEffect(() => {
      const currentObserverRef = observerRef.current
      if (!currentObserverRef) return

      const observer = new IntersectionObserver(
         entries => {
            if (entries[0].isIntersecting) {
               loadMoreHandler()
            }
         },
         { rootMargin: '100px' }
      )

      observer.observe(currentObserverRef)

      return () => {
         if (currentObserverRef) {
            observer.unobserve(currentObserverRef)
         }
      }
   }, [loadMoreHandler])

   return (
      <div className={'mt-12'}>
         <div className={'grid grid-cols-[repeat(auto-fill,230px)] gap-4'}>
            {data
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
