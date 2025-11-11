import { PostModal } from '@/shared/components/PostModal'
import Image, { StaticImageData } from 'next/image'

type Props = {
   isOpen: boolean
   onOpenChange: (value: boolean) => void
   image: StaticImageData
}

export const CroppingModal = ({ isOpen, image, onOpenChange }: Props) => {
   return (
      <PostModal
         open={isOpen}
         onOpenChange={onOpenChange}
         size={'image-upload'}
         headerText={'Cropping'}
         headerVariant={'with-navigation'}
         contentColumns={'one'}
      >
         <Image src={image} alt={'cropping image'} />
      </PostModal>
   )
}
