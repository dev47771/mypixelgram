import { PostModal } from '@/shared/components/PostModal'
import Image, { StaticImageData } from 'next/image'
import {
   CrossIcon,
   ExpandOutline,
   ImageOutline,
   MaximizeOutline,
   PlusCircleOutline,
} from '@/shared/icons'
import { cn } from '@/shared/lib'
import { RangeControl } from '@/shared/components/RangeControl'
import Cropper from 'react-easy-crop'
import { Slider } from '@/shared/components/Slider'
import { ACCEPTED_IMAGE_TYPES } from '@/shared/schema'
import { useCroppingModal } from '@/entities/posts/ui/modals/croppingModal/useCroppingModal'
import { AspectOption } from '@/entities/posts/ui/modals/croppingModal/AspectOption'

type Props = {
   isOpen: boolean
   onOpenChange: (value: boolean) => void
   images: StaticImageData[]
   onNext: () => void
   currentIndex: number
   onBack: () => void
   setCurrentIndex: (idx: number) => void
   setImages: (images: StaticImageData[]) => void
}

export const CroppingModal = ({
   currentIndex,
   setCurrentIndex,
   isOpen,
   onNext,
   onBack,
   images,
   onOpenChange,
   setImages,
}: Props) => {
   const {
      showZoomScale,
      showAspectRatio,
      showImageGallery,
      isProcessing,
      crop,
      zoom,
      aspect,
      naturalAspect,
      image,
      fileInputRef,
      handleAddImageClick,
      handleSet16_9Aspect,
      handleSetOriginalAspect,
      handleSet1_1Aspect,
      handleSet4_5Aspect,
      handleFilesSelected,
      deleteImage,
      handleThumbnailClick,
      onCropComplete,
      handleCropChange,
      handleChangeRange,
      handleZoomChange,
      toggleAspectRatio,
      toggleZoomScale,
      toggleGallery,
      handleSliderNavigation,
      closeAllPanels,
      handleNext,
      zoomScale,
   } = useCroppingModal({
      images,
      currentIndex,
      setCurrentIndex,
      setImages,
      onNext,
   })

   const handleImageClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      closeAllPanels()
   }

   const baseInteractiveButtonStyle =
      'cursor-pointer w-9 h-9 rounded-xs bg-dark-500 absolute bottom-[11px] flex items-center justify-center opacity-80'

   return (
      <PostModal
         open={isOpen}
         onOpenChange={onOpenChange}
         size={'image-upload'}
         onBack={onBack}
         headerText={'Cropping'}
         headerVariant={'with-navigation'}
         contentColumns={'one'}
         onNext={isProcessing ? undefined : handleNext}
         className={'relative'}
      >
         {isProcessing && (
            <div className="bg-dark-700 bg-opacity-80 absolute inset-0 z-50 flex items-center justify-center">
               <div className="text-light-100">Processing images...</div>
            </div>
         )}

         {showImageGallery ? (
            <div className="bg-dark-700 relative h-full w-full" onClick={handleImageClick}>
               <Slider
                  key={images.length}
                  images={images.map(img => img.src)}
                  currentIndex={currentIndex}
                  onIndexChangeAction={handleSliderNavigation}
                  className="h-full w-full"
               />
            </div>
         ) : (
            <div className="bg-dark-700 h-[400px] w-full" onClick={handleImageClick}>
               <Cropper
                  image={image?.src}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={handleCropChange}
                  onZoomChange={handleZoomChange}
                  onCropComplete={onCropComplete}
                  classes={{
                     containerClassName: 'absolute inset-0',
                     mediaClassName: 'max-h-full max-w-full',
                  }}
                  style={{
                     containerStyle: {
                        backgroundColor: '#000000',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                     },
                  }}
               />
            </div>
         )}

         {!showImageGallery && (
            <>
               <button
                  className={cn(
                     baseInteractiveButtonStyle,
                     'left-[11px]',
                     showAspectRatio && 'text-accent-500'
                  )}
                  onClick={e => {
                     e.stopPropagation()
                     toggleAspectRatio()
                  }}
               >
                  <ExpandOutline />
               </button>
               <button
                  className={cn(
                     baseInteractiveButtonStyle,
                     'left-[71px]',
                     showZoomScale && 'text-accent-500'
                  )}
                  onClick={e => {
                     e.stopPropagation()
                     toggleZoomScale()
                  }}
               >
                  <MaximizeOutline />
               </button>
            </>
         )}

         {showAspectRatio && !showImageGallery && (
            <div
               className={
                  'bg-dark-500 absolute bottom-[49px] left-[11px] flex h-[152px] w-[156px] flex-col rounded-xs opacity-80'
               }
            >
               <AspectOption
                  label="Original"
                  value={naturalAspect}
                  aspect={aspect}
                  onClick={handleSetOriginalAspect}
                  Icon={<ImageOutline />}
               />

               <AspectOption
                  label="1:1"
                  value={1}
                  aspect={aspect}
                  onClick={handleSet1_1Aspect}
                  boxClass="h-[18px] w-[18px]"
               />

               <AspectOption
                  label="4:5"
                  value={4 / 5}
                  aspect={aspect}
                  onClick={handleSet4_5Aspect}
                  boxClass="h-[26px] w-[18px]"
               />

               <AspectOption
                  label="16:9"
                  value={16 / 9}
                  aspect={aspect}
                  onClick={handleSet16_9Aspect}
                  boxClass="h-[20px] w-[26px]"
               />
            </div>
         )}

         {showZoomScale && !showImageGallery && (
            <div
               className={
                  'bg-dark-500 absolute bottom-[50px] left-[71px] flex h-[36px] w-[124px] items-center justify-center rounded-xs opacity-80'
               }
            >
               <RangeControl
                  max={100}
                  min={0}
                  step={1}
                  value={zoomScale}
                  onValueChange={handleChangeRange}
                  className={'w-25 cursor-pointer'}
               />
            </div>
         )}

         <button
            onClick={e => {
               e.stopPropagation()
               toggleGallery()
            }}
            className={cn(baseInteractiveButtonStyle, 'right-[11px]')}
         >
            <ImageOutline />
         </button>

         {showImageGallery && (
            <div
               className={
                  'bg-dark-500 absolute right-[11px] bottom-[49px] flex gap-3 rounded-xs p-3 opacity-80'
               }
            >
               {images.map((i, idx) => (
                  <div
                     key={i.src}
                     className={cn(
                        'relative cursor-pointer',
                        currentIndex === idx && 'ring-accent-500 rounded-xs ring-2'
                     )}
                     onClick={() => handleThumbnailClick(idx)}
                  >
                     <div className="relative h-[82px] w-20">
                        <Image
                           src={i.src}
                           alt={`Cropped image ${idx + 1}`}
                           fill
                           sizes="80px"
                           style={{
                              objectFit: 'contain',
                           }}
                        />
                     </div>
                     <button
                        onClick={e => {
                           e.stopPropagation()
                           deleteImage(idx)
                        }}
                        className={
                           'bg-dark-500 absolute top-[2px] right-[2px] flex h-3 w-3 cursor-pointer items-center justify-center rounded-xs'
                        }
                     >
                        <CrossIcon />
                     </button>
                  </div>
               ))}
               <button
                  onClick={handleAddImageClick}
                  className={'flex h-9 w-9 cursor-pointer align-top'}
               >
                  <PlusCircleOutline />
               </button>
               <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                  className="hidden"
                  onChange={handleFilesSelected}
               />
            </div>
         )}
      </PostModal>
   )
}
