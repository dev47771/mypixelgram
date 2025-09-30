import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Sidebar, SidebarItem } from '@/widgets/Sidebar/Sidebar'
import {
   CreateIcon,
   CreateOutlineIcon,
   HomeIcon,
   HomeOutlineIcon,
   LogoutIcon,
} from '@/shared/icons'
import { sidebarData } from '@/widgets/Sidebar/sidebarData'
import { action } from 'storybook/actions'

const meta = {
   title: 'Components/Sidebar',
   component: Sidebar,
   globals: {
      backgrounds: { value: 'dark' },
   },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      children: (
         <>
            {sidebarData.map(item => (
               <SidebarItem key={item.id} {...item} />
            ))}
         </>
      ),
   },
}

export const WithDisabledItem: Story = {
   args: {
      children: (
         <>
            <SidebarItem
               id={'1'}
               path={'/'}
               disabled
               name={'Feed'}
               icon={HomeOutlineIcon}
               activeIcon={HomeIcon}
            />
            <SidebarItem
               id={'2'}
               path={'/'}
               name={'Create'}
               icon={CreateOutlineIcon}
               activeIcon={CreateIcon}
               className={'mb-35'}
            />
            <SidebarItem id={'3'} path={'/'} name={'Log out'} icon={LogoutIcon} />
         </>
      ),
   },
}

export const WithButtonItem: Story = {
   args: {
      children: (
         <>
            <SidebarItem
               id={'1'}
               path={'/'}
               name={'Feed'}
               icon={HomeOutlineIcon}
               activeIcon={HomeIcon}
            />
            <SidebarItem
               id={'2'}
               path={'/'}
               name={'Create'}
               icon={CreateOutlineIcon}
               activeIcon={CreateIcon}
               onClick={action('on-click')}
               className={'mb-35'}
            />
            <SidebarItem id={'3'} path={'/'} name={'Log out'} icon={LogoutIcon} />
         </>
      ),
   },
}
