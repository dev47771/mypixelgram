import { Typography } from '@/shared/components/Typography/Typography'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { typographyVariants } from '@/shared/lib'

const meta = {
   argTypes: {
      as: {
         options: ['p', 'h1', 'h2', 'h3', 'h4', 'span', 'label', 'div'],
      },
      variant: {
         control: { type: 'select' },
         options: [...typographyVariants],
      },
   },
   component: Typography,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
   args: {
      children: 'Card content',
      variant: 'h1',
   },
}

export const AllVariants: Story = {
   render: () => (
      <div className="flex flex-col">
         {typographyVariants.map(variant => {
            const isLink = variant.includes('link')

            return (
               <div key={variant} className="flex items-center gap-5">
                  <span className="text-m text-gray-500">{variant}:</span>
                  <Typography variant={variant} {...(isLink ? { href: '#' } : {})}>
                     Card content
                  </Typography>
               </div>
            )
         })}
      </div>
   ),
}
