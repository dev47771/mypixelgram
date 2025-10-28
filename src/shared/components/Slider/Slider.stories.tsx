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

const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

export const Default: Story = {
   args: {
      images,
   },
   render: () => <Slider images={images} />,
}

export const SmallSlider: Story = {
   args: {
      images,
   },
   render: () => <Slider images={images} className={'h-[240px] w-[234px]'} />,
}

export const BigSlider: Story = {
   args: {
      images,
   },
   render: () => <Slider images={images} className={'h-[562px] w-[490px]'} />,
}
