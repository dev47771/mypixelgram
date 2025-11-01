import { useState } from 'react'
import { MODALS } from '..'

export const useModalStack = (initialModal: string = MODALS.ADD_PHOTO) => {
   const [modalStack, setModalStack] = useState([initialModal])

   //замена текущей модалки на другую ***, указанную в openMainModal(***)
   const openMainModal = (modalName: string) => {
      setModalStack(prev => [...prev.slice(0, -1), modalName])
   }

   //добавляет к отображению помимо текущей модалки еще одну поверх (для реалиации показа окна close поверх модального окна текущего шага)
   const openOverlayModal = (modalName: string) => {
      setModalStack(prev => [...prev, modalName])
   }

   //закрывает ту модалку, что поверх текущей (для кнопки no в модалке close)
   const closeTopModal = () => {
      setModalStack(prev => prev.slice(0, -1))
   }

   //сброс PostCreator к первоначальному состоянию
   const resetModalStack = () => {
      setModalStack([initialModal])
   }

   return {
      modalStack,
      openMainModal,
      openOverlayModal,
      closeTopModal,
      resetModalStack,
   }
}
