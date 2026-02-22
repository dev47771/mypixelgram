'use client'
import { MoreIcon } from '@/shared/icons'
import { DropDownMenu, DropDownMenuItem } from '@/shared/components/DropDownMenu'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'
import { Typography } from '@/shared/components/Typography'
import { POST_MENU_ITEMS } from '@/entities/post/ui/Post/PostHeader/PostMenu/config'
import { DeletePostModal } from '@/features/post-creator/ui/modals/DeletePostModal/DeletePostModal'
import { usePostController } from '@/features/post/model/hooks'
import { useMeQuery } from '@/features/auth/api'

type Props = {
   userId: string
   postId: string
}

export const PostMenu = ({ userId }: Props) => {
   const { data: me } = useMeQuery()
   const isOwner = me?.userId === userId

   const dropDownItems = isOwner ? POST_MENU_ITEMS.owner : POST_MENU_ITEMS.viewer
   const { handleMenuAction, isDeleteModalOpen, confirmDelete, closeDeletePostModal } =
      usePostController()

   return (
      <>
         <DropDownMenu
            trigger={
               <DropDownMenuTrigger className={'data-[state=open]:text-accent-500 ml-auto'}>
                  <MoreIcon />
               </DropDownMenuTrigger>
            }
            alignOffset={0}
         >
            {dropDownItems.map(({ icon: Icon, value, action }) => (
               <DropDownMenuItem
                  key={value}
                  className={'flex items-center gap-3 p-3'}
                  onSelect={() => handleMenuAction(action)}
               >
                  <Icon />
                  <Typography variant={'captionRegular'} as={'span'}>
                     {value}
                  </Typography>
               </DropDownMenuItem>
            ))}
         </DropDownMenu>

         <DeletePostModal
            open={isDeleteModalOpen}
            onConfirm={confirmDelete}
            onCancel={closeDeletePostModal}
         />
      </>
   )
}
