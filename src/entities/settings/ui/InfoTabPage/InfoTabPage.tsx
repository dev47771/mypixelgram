'use client'

import {
   useDeleteAvatarMutation,
   useGetCountriesWithCitiesQuery,
   useGetProfileQuery,
   useUpdateProfileMutation,
} from '@/features/settings/api/settings.service'
import { GeneralInformationForm } from './GeneralInormationForm/GeneralInormationForm'
import { updateProfileArgs } from '@/features/settings/api/settings.types'
import { isErrorInDataResponse } from '@/shared/utils'
import { alert } from '@/shared/components/Alert'
import { ErrorResponse } from '@/features/auth/api'
import { Loader } from '@/shared/components/Loader'
import { dateFormatter } from '@/shared/utils/date/dateFormatter'
import { useState } from 'react'
import { Button } from '@/shared/components/Button'
import { CrossIcon, PostOutlineIcon } from '@/shared/icons'
import { YesAndNoModal } from '@/shared/ui/YesAndNoModal'
import { Avatar } from '@/shared/components/Avatar'
import { AddAvatarModal } from '../modals/AddAvatarModal'
import { cn } from '@/shared/lib'

export const InfoTabPage = () => {
   const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
   const { data: countryCityData } = useGetCountriesWithCitiesQuery()
   const { data: profileData, isLoading: isLoadingGetProfile } = useGetProfileQuery()
   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

   const [deleteAvatar] = useDeleteAvatarMutation()

   const handleAvatarClick = () => {
      if (profileData?.dateOfBirth) {
         setIsAvatarModalOpen(true)
      } else {
         alert.error('You must complete and save the profile form with required fields.')
      }
   }

   const handleConfirmDelete = async () => {
      try {
         await deleteAvatar().unwrap()
         setIsDeleteModalOpen(false)
      } catch (e) {
         console.error('Failed to delete post', e)
      }
   }

   const handleSaveGeneralInformation = async (data: updateProfileArgs) => {
      try {
         const formattedData = {
            ...data,
            dateOfBirth: dateFormatter.formToServer(data.dateOfBirth),
         }
         await updateProfile(formattedData).unwrap()
         alert.success('Your settings are saved!')
      } catch (error) {
         alert.error(
            (error as ErrorResponse).errorsMessages?.[0]?.message || 'Server is not available!'
         )
      }
   }

   if (isLoadingGetProfile) return <Loader />

   return (
      <div className="relative flex">
         <div className="border-dark-100 mr-8 w-[201px]">
            <div className={'mt-[px] flex flex-col justify-center'}>
               <div className={'mb-[24px] flex w-[201px] justify-center'}>
                  {profileData?.avatar ? (
                     <div className="relative">
                        <Avatar size="profile" src={profileData?.avatar} alt="user avatar" />
                        <button
                           className={cn(
                              'absolute right-[8px] bottom-[155px] z-0 flex items-center justify-center',
                              'before:absolute before:h-6 before:w-6 before:rounded-full',
                              'before:border-dark-900 before:border-4 before:bg-red-500',
                              'cursor-pointer before:-z-10 before:box-border'
                           )}
                           onClick={() => setIsDeleteModalOpen(true)}
                        >
                           <CrossIcon className="h-4 w-4" />
                        </button>
                     </div>
                  ) : (
                     <div className="bg-dark-500 flex h-48 w-48 items-center justify-center rounded-full">
                        <PostOutlineIcon width={48} height={48} />
                     </div>
                  )}
               </div>
               <Button
                  variant="outlined"
                  className="width-fit items-center whitespace-nowrap"
                  onClick={handleAvatarClick}
               >
                  Select Profile Photo
               </Button>
            </div>
         </div>
         <GeneralInformationForm
            profileData={profileData}
            countryCityData={countryCityData || {}}
            onSubmitAction={handleSaveGeneralInformation}
            isLoading={isLoading || isLoadingGetProfile}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
         />
         <hr className={'text-dark-100 absolute right-0 bottom-13 left-0 h-[1px] -translate-y-6'} />
         <AddAvatarModal
            open={isAvatarModalOpen}
            onOpenChange={() => setIsAvatarModalOpen(false)}
         />

         <YesAndNoModal
            open={isDeleteModalOpen}
            title="Delete Photo"
            description="Are you sure you want to delete the photo?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
         />
      </div>
   )
}
