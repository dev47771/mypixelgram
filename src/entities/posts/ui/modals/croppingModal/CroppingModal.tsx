import { PostModal } from '@/shared/components/PostModal'
import Image, { StaticImageData } from 'next/image'
import ReactCrop, { type Crop } from 'react-image-crop'
import { useState } from 'react'
import { ExpandOutline, ImageOutline, MaximizeOutline } from '@/shared/icons'
import { cn } from '@/shared/lib'

type Props = {
   isOpen: boolean
   onOpenChange: (value: boolean) => void
   image: StaticImageData
   onNext: () => void
}

export const CroppingModal = ({ isOpen, onNext, image, onOpenChange }: Props) => {
   const [crop, setCrop] = useState<Crop>()
   // const [aspect, setAspect] = useState()
   const [showZoomScale, setShowZoomScale] = useState(false)

   const baseButtonStyle =
      'cursor-pointer w-9 h-9 rounded-xs bg-dark-500 absolute bottom-[11px] flex items-center justify-center'

   const changeZoomHandler = () => setShowZoomScale(prev => !prev)
   return (
      <PostModal
         open={isOpen}
         onOpenChange={onOpenChange}
         size={'image-upload'}
         headerText={'Cropping'}
         headerVariant={'with-navigation'}
         contentColumns={'one'}
         onNext={onNext}
         className={'relative'}
      >
         <ReactCrop crop={crop} onChange={c => setCrop(c)}>
            <Image src={image} alt={'cropping image'} />
         </ReactCrop>
         <button className={cn(baseButtonStyle, 'left-[11px]')}>
            <ExpandOutline />
         </button>
         <button className={cn(baseButtonStyle, 'left-[71px]')} onClick={changeZoomHandler}>
            <MaximizeOutline />
         </button>
         {showZoomScale && (
            <div
               className={
                  'bg-dark-500 absolute bottom-[50px] left-[71px] flex h-[36px] w-[124px] items-center justify-center rounded-xs'
               }
            >
               <input type={'range'} />
            </div>
         )}
         <button className={cn(baseButtonStyle, 'right-[11px]')}>
            <ImageOutline />
         </button>
      </PostModal>
   )
}
