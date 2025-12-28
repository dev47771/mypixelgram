'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
   title: 'Modals/Settings/AvatarCropper',
   parameters: {
      layout: 'centered',
   },
}

export default meta
type Story = StoryObj

export const AvatarCropperStory: Story = {
   render: () => (
      <div className="flex flex-col items-center">
         <div
            style={{
               width: 300,
               height: 300,
               position: 'relative',
               backgroundImage: 'url(./logo-dark.png)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               borderRadius: '50%',
               overflow: 'hidden',
            }}
         >
            <div
               style={{
                  position: 'absolute',
                  inset: 0,
                  border: '2px solid white',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
               }}
            />
         </div>

         {/* Слайдер зума */}
         <input
            type="range"
            min="1"
            max="4"
            step="0.1"
            defaultValue="1"
            className="mt-4 w-64"
            aria-label="Zoom"
         />
      </div>
   ),
}
