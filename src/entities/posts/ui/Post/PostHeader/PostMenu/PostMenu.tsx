import { MoreIcon } from '@/shared/icons'
import { DropDownMenu, DropDownMenuItem } from '@/shared/components/DropDownMenu'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'
import { Typography } from '@/shared/components/Typography'
import { POST_MENU_ITEMS } from '@/entities/posts/ui/Post/PostHeader/PostMenu/config'

type Props = {
   isOwner: boolean
}

export const PostMenu = ({ isOwner }: Props) => {
   const dropDownItems = isOwner ? POST_MENU_ITEMS.owner : POST_MENU_ITEMS.viewer

   return (
      <DropDownMenu
         trigger={
            <DropDownMenuTrigger className={'data-[state=open]:text-accent-500 ml-auto'}>
               <MoreIcon />
            </DropDownMenuTrigger>
         }
         alignOffset={0}
      >
         {dropDownItems.map(({ icon: Icon, value }) => (
            <DropDownMenuItem key={value} className={'flex items-center gap-3 p-3'}>
               <Icon />
               <Typography variant={'captionRegular'} as={'span'}>
                  {value}
               </Typography>
            </DropDownMenuItem>
         ))}
      </DropDownMenu>
   )
}
