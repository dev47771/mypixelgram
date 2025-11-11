import { YesAndNoModal } from '@/entities/common/ui'

type Props = {
   open: boolean
   onConfirm: () => void
   onCancel: () => void
}

export const DeletePostModal = ({ open, onConfirm, onCancel }: Props) => {
   return (
      <YesAndNoModal
         open={open} //true по нажатию на delete post
         title="Delete Post"
         description="Are you sure you want to delete this post?"
         onConfirm={onConfirm} //yes, отправляем запрос на удаление поста и закрываем все модальные окна, переадрессовываем пользователя на его домашнюю страницу
         onCancel={onCancel} //no, закрываем DeletePostModal
         isDeletePostModal={true}
      />
   )
}
