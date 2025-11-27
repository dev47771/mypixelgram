import { MoreIcon } from '@/shared/icons'
import { DropDownMenu, DropDownMenuItem } from '@/shared/components/DropDownMenu'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'
import { Typography } from '@/shared/components/Typography'
import { POST_MENU_ITEMS } from '@/entities/posts/ui/Post/PostHeader/PostMenu/config'
import { usePostMenuActions } from './usePostMenuActions'
import { DeletePostModal } from '@/entities/posts/ui/modals/DeletePostModal/DeletePostModal'

type Props = {
   isOwner: boolean
   postId: string
}

export const PostMenu = ({ isOwner, postId }: Props) => {
   const dropDownItems = isOwner ? POST_MENU_ITEMS.owner : POST_MENU_ITEMS.viewer
   const { handleAction, isDeleteModalOpen, confirmDelete, closeDeletePostModal } =
      usePostMenuActions(postId)

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
                  onSelect={() => handleAction(action)}
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
