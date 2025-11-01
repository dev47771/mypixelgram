import { CopyIcon, EditIcon, TrashIcon, UnfollowIcon } from '@/shared/icons'

export const POST_MENU_ITEMS = {
   owner: [
      { icon: EditIcon, value: 'Edit post' },
      { icon: TrashIcon, value: 'Delete post' },
   ],
   viewer: [
      { icon: UnfollowIcon, value: 'Unfollow' },
      { icon: CopyIcon, value: 'Copy link' },
   ],
}
