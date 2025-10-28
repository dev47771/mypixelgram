import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SliderRoot } from '@/shared/components/Slider'
import { useSlider } from '@/shared/components/Slider/useSlider'
import { SliderSlide } from '@/shared/components/Slider'
import Image from 'next/image'
import { SliderArrow } from '@/shared/components/Slider'
import { SliderDots } from '@/shared/components/Slider'
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/icons'
import { SliderContent } from '@/shared/components/Slider'

const meta = {
   title: 'Components/Slider',
   component: SliderRoot,
   tags: ['autodocs'],
   argTypes: {
      children: {
         table: {
            disable: true,
         },
      },
   },
   parameters: {
      layout: 'centered',
   },
   globals: {
      backgrounds: { value: 'dark' },
   },
} satisfies Meta<typeof SliderRoot>

export default meta
type Story = StoryObj<typeof meta>

const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']

const Slider = ({ images, className }: { images: string[]; className?: string }) => {
   const { sliderRef, instanceRef, currentSlide, slides } = useSlider()

   const onNextSlideHandler = () => instanceRef.current?.next()
   const onPrevSlideHandler = () => instanceRef.current?.prev()
   const onDotClickHandler = (i: number) => instanceRef.current?.moveToIdx(i)

   return (
      <SliderRoot className={className}>
         <SliderContent ref={sliderRef}>
            {images.map((src, i) => (
               <SliderSlide key={i}>
                  <Image src={src} fill alt={'slider_element'} />
               </SliderSlide>
            ))}
         </SliderContent>

         <SliderArrow className={'left-4'} onClick={onPrevSlideHandler}>
            <ArrowLeftIcon className={'group-hover:text-accent-300'} />
         </SliderArrow>
         <SliderArrow className={'right-[4px]'} onClick={onNextSlideHandler}>
            <ArrowRightIcon className={'group-hover:text-accent-300'} />
         </SliderArrow>

         <SliderDots slides={slides} currentSlide={currentSlide} onDotClick={onDotClickHandler} />
      </SliderRoot>
   )
}

export const Default: Story = {
   args: {
      children: <Slider images={images} />,
   },
}

export const SmallSlider: Story = {
   args: {
      children: <Slider images={images} className={'h-[240px] w-[234px]'} />,
   },
}

export const BigSlider: Story = {
   args: {
      children: <Slider images={images} className={'h-[562px] w-[490px]'} />,
   },
}
