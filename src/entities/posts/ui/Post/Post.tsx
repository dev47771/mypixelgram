import { Modal, ModalBody, ModalClose } from '@/shared/components/Modal'
import { Slider } from '@/shared/components/Slider'
import { CrossIcon } from '@/shared/icons'
import { PostHeader } from '@/entities/posts/ui/Post/PostHeader'
import { PostBody } from '@/entities/posts/ui/Post/PostBody'
import { PostFooter } from '@/entities/posts/ui/Post/PostFooter'

type Props = {
   post: any
}

export const Post = ({ post }: Props) => {
   return (
      <Modal open={true} onOpenChange={() => {}}>
         <ModalClose className={'absolute -top-[36px] -right-[42px] z-10 outline-none'}>
            <CrossIcon />
         </ModalClose>

         <ModalBody className="relative flex">
            <Slider images={post.images} className={'h-[562px] w-[490px] overflow-hidden'} />

            <div className={'flex h-[562px] w-[490px] flex-col'}>
               <PostHeader post={post} />
               <PostBody post={post} />
               <PostFooter post={post} />
            </div>
         </ModalBody>
      </Modal>
   )
}
