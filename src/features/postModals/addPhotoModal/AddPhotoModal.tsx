import { Modal, ModalBody, ModalClose, ModalTitle } from '@/shared/components/Modal'
import { Typography } from '@/shared/components/Typography'
import { CrossIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'

export const AddPhotoModal = () => {
   return (
      <Modal>
         <ModalTitle className={'flex items-center justify-between'}>
            <Typography variant={'h1'}>Add Photo</Typography>
            <ModalClose asChild>
               <CrossIcon />
            </ModalClose>
         </ModalTitle>
         <hr className={'text-dark-100 h-[1px]'} />
         <ModalBody className="flex max-w-[378px] flex-col gap-4 px-6 py-3">
            <div className={'h-[228px] w-[222px]'}></div>
            <Button>Select from Computer</Button>
            <Button>Open Draft</Button>
         </ModalBody>
      </Modal>
   )
}
