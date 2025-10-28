'use client';

import { useState } from "react";
import { MODALS, useModalStack } from ".";


export const PostCreator = () => {
    const { modalStack, currentMainModal, openMainModal, openOverlayModal, closeTopModal, closeAllModals } = useModalStack();
    const [photos, setPhotos] = useState<File[]>([]); //какая типизация у фото

    const handleUploadSuccess = (uploadedPhotos: File[]) => {
        setPhotos(uploadedPhotos);
        //openMainModal(MODALS.CROPPING);
    };

    const requestClose = () => {
        openOverlayModal(MODALS.CLOSE);
    };

    const renderModals = () => {
        return modalStack.map((modalName, index) => {
            const isTopModal = index === modalStack.length - 1;

            switch (modalName) {

                //основные модальные окошки PostCreator
                case MODALS.ADD_PHOTO:
                    // return <AddPhotoModal key="add_photo" {...{ onUploadSuccess: handleUploadSuccess, onClose: requestClose, isTopModal }} />;

                case MODALS.CROPPING:
                    // return <CroppingModal key="cropping" {...{ photos, onNext: () => openMainModal(MODALS.FILTERS), onBack: () => openMainModal(MODALS.ADD_PHOTO), onClose: requestClose, isTopModal }} />;

                case MODALS.FILTERS:
                    // return <FiltersModal key="filters" {...{ photos, onNext: () => openMainModal(MODALS.PUBLICATION), onBack: () => openMainModal(MODALS.CROPPING), onClose: requestClose, isTopModal }} />;

                case MODALS.PUBLICATION:
                    // return <PublicationModal key="publication" {...{ photos, publish: () => null, onBack: () => openMainModal(MODALS.FILTERS), onClose: requestClose, isTopModal }} />;


                //модалка закрытия для PostCreator
                case MODALS.CLOSE:
                    // return <CloseModal key="close" {...{ onConfirm: closeAllModals, onCancel: closeTopModal, isTopModal }} />;


                default:
                    return null;
            }
        });
    };

    return (
        <>
            {renderModals()}
        </>
    );
};


