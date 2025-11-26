import Image from 'next/image'
import { useGetUserPostsInfiniteQuery, useGetUserPublicPostsQuery } from '@/features/posts/api'
import { useMeQuery } from '@/features/auth/api'
import { useCallback, useEffect, useRef } from 'react'

type Props = {
   login: string
}

export const ProfilePosts = ({ login }: Props) => {
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

   const privatePosts =
      posts?.pages.flatMap(page =>
         page.publications.map(pub => ({
            id: pub.postId,
            imageUrl: pub.firstFileUrl,
         }))
      ) ?? []

   console.log(privatePosts)

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
                    <div key={post.id} className="relative h-[228px] w-[234px] cursor-pointer">
                       <Image
                          src={post.imageUrl}
                          alt="post image"
                          width={234}
                          height={228}
                          className="h-full w-full object-cover"
                       />
                    </div>
                 ))
               : publicPosts?.map(post => (
                    <div key={post.postId} className="relative h-[228px] w-[234px] cursor-pointer">
                       <Image
                          src={post.files[0].url}
                          alt="post image"
                          width={234}
                          height={228}
                          className="h-full w-full object-cover"
                       />
                    </div>
                 ))}
         </div>

         <div ref={observerRef} className={'h-6'}></div>
      </div>
   )
}
