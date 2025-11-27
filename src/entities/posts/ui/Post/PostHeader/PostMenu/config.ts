import { CopyIcon, EditIcon, TrashIcon, UnfollowIcon } from '@/shared/icons'

export const POST_MENU_ITEMS = {
   owner: [
      { icon: EditIcon, value: 'Edit post', action: 'edit' },
      { icon: TrashIcon, value: 'Delete post', action: 'delete' },
   ],
   viewer: [
      { icon: UnfollowIcon, value: 'Unfollow', action: 'unfollow' },
      { icon: CopyIcon, value: 'Copy link', action: 'copy' },
   ],
}
