import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Slider } from '@/shared/components/Slider'

const meta = {
   title: 'Components/Slider',
   component: Slider,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
   globals: {
      backgrounds: { value: 'dark' },
   },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const images = [
   'https://images.unsplash.com/photo-1743233883542-6028ee3882f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
   'https://images.unsplash.com/photo-1748014145277-7d7a173329f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
   'https://images.unsplash.com/photo-1743947197487-3534e60ca31b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=931',
]

export const Default: Story = {
   args: {
      images,
      className: 'h-[501px] w-[490px]',
   },
}

export const SmallSlider: Story = {
   args: {
      images,
      className: 'h-[240px] w-[234px]',
   },
   // render: () => (
   //    <div>
   //       <Slider images={images} className={'h-[240px] w-[234px]'} />
   //    </div>
   // ),
}

export const BigSlider: Story = {
   args: {
      images,
      className: 'h-[562px] w-[490px]',
   },
   //render: () => <Slider images={images} className={'h-[562px] w-[490px]'} />,
}

export const WithOneSlide: Story = {
   args: {
      images: ['./public/404.jpg'],
      className: 'h-[501px] w-[490px]',
   },
}
