import { YesAndNoModal } from '@/entities/common/ui'
import { YesAndNoModalProps } from '@/entities/common/ui/YesAndNoModal'

type Props = YesAndNoModalProps

export const CancelEditModal = ({ open, onConfirm, onCancel }: Props) => {
   return (
      <YesAndNoModal
         open={open} //true по нажатию на edit post
         title="Close Post"
         description={`Do you really want to close the edition of the publication?\nIf you close changes won’t be saved`}
         onConfirm={onConfirm} //yes, закрываем CancelEditModal и модалку редактирования
         onCancel={onCancel} //no, закрываем CancelEditModal
         className="max-w-[484px]"
      />
   )
}
