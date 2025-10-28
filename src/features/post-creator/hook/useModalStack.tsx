import { useState } from "react";
import { MODALS } from "..";

export const useModalStack = (initialModal: string = MODALS.ADD_PHOTO) => {
  const [modalStack, setModalStack] = useState([initialModal]);

  //замена текущей модалки на другую ***, указанную в openMainModal(***)
  const openMainModal = (modalName: string) => {
    setModalStack(prev => [...prev.slice(0, -1), modalName]);
  };

  //добавляет к отображению помимо текущей модалки еще одну поверх (для реалиации показа окна close поверх модального окна текущего шага)
  const openOverlayModal = (modalName: string) => {
    setModalStack(prev => [...prev, modalName]);
  };

  //закрывает ту модалку, что поверх текущей (для кнопки no в модалке close)
  const closeTopModal = () => {
    setModalStack(prev => prev.slice(0, -1));
  };

  //закрывает все модалки (для кнопки yes в модалке close) ??? не лучшее решение, нужно передавать в сайдбар состояние close компоненты PostCreator и при открытии вновь отражать initial модальное окно
  const closeAllModals = () => {
    setModalStack([]);
  };

  //текущая активная модалка
  const currentMainModal = modalStack[modalStack.length - 1];

  return {
    modalStack,
    currentMainModal,
    openMainModal,
    openOverlayModal,
    closeTopModal,
    closeAllModals
  };
};