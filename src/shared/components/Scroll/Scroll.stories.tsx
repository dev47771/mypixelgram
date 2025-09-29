import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Scroll } from './Scroll'

const meta = {
   component: Scroll,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Scroll',
} satisfies Meta<typeof Scroll>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

const VerticalScrollChildren = () => {
   return (
      <div className="p-4">
         <div className="text-light-900 text-base font-medium">Vertical Tags</div>
         <div className="space-y-2">
            {tags.map(tag => (
               <div
                  key={tag}
                  className="border-light-900 text-light-900 rounded border px-3 py-1 text-sm"
               >
                  {tag}
               </div>
            ))}
         </div>
      </div>
   )
}

const HorizontalScrollChildren = () => {
   return (
      <div className="p-4">
         <div className="text-light-900 text-base font-medium">Horizontal Tags</div>
         <div className="flex w-[800px] gap-3">
            {tags.map(tag => (
               <div
                  key={tag}
                  className="border-light-900 text-light-900 rounded border px-4 py-2 text-sm whitespace-nowrap"
               >
                  Version: {tag}
               </div>
            ))}
         </div>
      </div>
   )
}

export const VerticalScroll: Story = {
   args: {
      children: <VerticalScrollChildren />,
      className: 'w-90 h-90 border-2 border-light-900',
   },
}

export const HorizontalScroll: Story = {
   args: {
      children: <HorizontalScrollChildren />,
      className: 'w-200 h-25 border-2 border-light-900',
   },
}

export const HorizontalAndVerticalScroll: Story = {
   args: {
      children: (
         <>
            <HorizontalScrollChildren />
            <VerticalScrollChildren />
         </>
      ),
      className: 'w-150 h-100 border-2 border-light-900',
   },
}
