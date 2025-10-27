import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon, PostOutlineIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'

export const AddPhotoModal = () => {
   return (
      <Modal className={'h-[564px] w-[492px]'} open>
         <ModalTitle className={'flex items-center justify-between'}>
            <Typography variant={'h1'}>Add Photo</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>
         <hr className={'text-dark-100 h-[1px]'} />
         <ModalBody className="flex flex-col gap-15 pt-[72px] pr-[135px] pb-[48xp] pl-[135px]">
            <div
               className={
                  'bg-dark-500 flex h-[228px] w-[222px] items-center justify-center rounded-xs'
               }
            >
               <PostOutlineIcon className={'h-12 w-12'} />
            </div>
            <div className={'flex max-w-[219px] flex-col gap-4'}>
               <Button>Select from Computer</Button>
               <Button variant={'outlined'}>Open Draft</Button>
            </div>
         </ModalBody>
      </Modal>
   )
}
