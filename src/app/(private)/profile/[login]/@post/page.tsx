import { PostPageWrapper } from '@/widgets/PostPageWrapper'

type Props = {
   searchParams: Promise<{ [key: string]: string }>
}
export default async function PostPage({ searchParams }: Props) {
   const { postId } = await searchParams

   if (!postId) return null

   return <PostPageWrapper postId={postId} />
}
