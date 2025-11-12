'use client'

import { useEffect, useState } from 'react'
import { MODALS, PostCreatorSlider, useModalStack } from '.'
import { PostModal } from '@/shared/components/PostModal'
import { FiltersBlock } from './ui/modals/FilterBlock/FiltersBlock'

export type PhotoState = {
    id: string
    originalFile: File // Исходный файл
    previewUrl: string // URL.createObjectURL(file)
    currentFilter: string // Текущий активный фильтр
}

type Props = {
    onClose?: () => void
}

export const PostCreator = ({ onClose }: Props) => {
    const {
        modalStack,
        openMainModal,
        openOverlayModal,
        closeTopModal,
        resetModalStack
    } = useModalStack()

    //массив с объектами фото
    const [photos, setPhotos] = useState<PhotoState[]>([])

    //индекс текущего фото в слайдере
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

    //добавление новых фото (РАССКОММЕНТИТЬ)
    const handleAddPhotos = (newFiles: File[]) => {
        const newPhotos: PhotoState[] = newFiles.map(file => ({
            id: Math.random().toString(),
            originalFile: file,
            previewUrl: URL.createObjectURL(file),
            currentFilter: 'filter-none',
        }));

        setPhotos(prev => [...prev, ...newPhotos]);
    };

    //применение фильтра к текущему фото
    const applyFilterToCurrentPhoto = (filter: string) => {
        setPhotos(prev =>
            prev.map((photo, index) =>
                index === currentPhotoIndex
                    ? {
                        ...photo,
                        currentFilter: filter,
                    }
                    : photo
            )
        )
    }

    //при закрытии PostCreator сработает очистка массива с фото и сбросится до initial состояния массив modalStack
    useEffect(() => {
        return () => {
            resetModalStack()
            setPhotos([])
        }
    }, [])

    //закрытие PostCreator (РАСКОММЕНТИТЬ)
    const handleCompleteClose = () => {
        onClose?.(); // вызовет router.back() из компонента profile
    };


    const requestClose = () => {
        openOverlayModal(MODALS.CLOSE);
    };

    const renderModals = () => {
        return modalStack.map(modalName => {
            switch (modalName) {
                //основные модальные окошки PostCreator
                case MODALS.ADD_PHOTO:
                    // return <AddPhotoModal
                    //     key="add_photo"
                    //     onPhotoSelected={(file: File) => {
                    //         handleAddPhotos([file]);
                    //         openMainModal(MODALS.CROPPING);
                    //     }}
                    //     onClose={requestClose}
                    // />;
                    break

                case MODALS.CROPPING:
                    // return <CroppingModal
                    //     key="cropping"
                    //     photos={photos}
                    //     onNext={() => openMainModal(MODALS.FILTERS)}
                    //     onBack={() => openMainModal(MODALS.ADD_PHOTO)}
                    //     onClose={requestClose}
                    // />;
                    break

                case MODALS.FILTERS:
                    return (
                        <PostModal
                            key="filters"
                            size="post-management"
                            headerText="Filters"
                            headerVariant="with-navigation"
                            contentColumns="two"
                            onBack={() => openMainModal(MODALS.CROPPING)}
                            onNext={() => openMainModal(MODALS.PUBLICATION)}
                            //onClose={requestClose}
                            leftContent={
                                <PostCreatorSlider
                                    //передаем ссылку на каждую фотографию для предпоказа в слайдере
                                    images={photos.map(photo => photo.previewUrl)}
                                    //применяем фильтр к текущему в слайдере фото, если к фото был применен фильтр (только предпоказ, сам файл не изменяется)
                                    currentFilter={
                                        photos[currentPhotoIndex]?.currentFilter || 'filter-none'
                                    }
                                    //узнаем индекс текущего в слайдере фото (нумерация в нашем массиве с объектами фото и нумерация при отрисовке url этих фото в слайдере одинаковая => index === currentPhotoIndex)
                                    onSlideChange={setCurrentPhotoIndex}
                                />
                            }
                            rightContent={
                                <FiltersBlock
                                    //на основании примененного фильтра к текущему фото изменяем внешний вид иконки с фильтром (если текущее фото с фильтром moon, то иконка moon подсветится как выбранная)
                                    currentFilter={
                                        photos[currentPhotoIndex]?.currentFilter || 'filter-none'
                                    }
                                    //узнаем, какой фильтр хочет применить пользователь к фото (при нажатии на фильтр moon сработает функция applyFilterToCurrentPhoto и в объект текущей фотографии будет внесено изменение, будет добавлен фильтр)
                                    onFilterChange={applyFilterToCurrentPhoto}
                                />
                            }
                        />
                    )
                    break

                case MODALS.PUBLICATION:
                    // return <PublicationModal
                    //     key="publication"
                    //     photos={photos}
                    //     publish={() => null} //тут будет отправка публикации вместо null + нужно добавить закрытие PostCreator после успешного создания поста и отображение поста в ленте пользователя + {handleApplyFilters} для применения фильтров к фото перед отправкой???
                    //
                    //     onBack={() => openMainModal(MODALS.FILTERS)}
                    //     onClose={requestClose}
                    // />;
                    break

                //модалка закрытия для PostCreator
                case MODALS.CLOSE:
                    // return <CloseModal
                    //     key="close"
                    //     onConfirm={closeTopModal} //для кнопки no, крестика в модалке close и при клике где-то вне зоны модалки close
                    //     onCancel={handleCompleteClose} //для кнопки yes (закроет PostCreator)
                    // />;
                    break

                default:
                    return null
            }
        })
    }

    return <>{renderModals()}</>
}
