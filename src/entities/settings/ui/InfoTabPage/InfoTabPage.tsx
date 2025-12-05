import {
   useGetCountriesWithCitiesQuery,
   useUpdateProfileMutation,
} from '@/features/settings/api/settings.service'
import { GeneralInformationForm } from './GeneralInormationForm/GeneralInormationForm'
import { updateProfileArgs } from '@/features/settings/api/settings.types'
import { isErrorInDataResponse } from '@/shared/utils'
import { alert } from '@/shared/components/Alert'
import { ErrorResponse } from '@/features/auth/api'

export const InfoTabPage = () => {
   const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
   const { data: countryCityData } = useGetCountriesWithCitiesQuery()

   const handleSaveGeneralInformation = async (data: updateProfileArgs) => {
      try {
         const formattedData = {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth.split('.').reverse().join('-')).toISOString(),
         }
         await updateProfile(formattedData).unwrap()
         alert.success('Your settings are saved!')
      } catch (error) {
         alert.error(
            (error as ErrorResponse).errorsMessages?.[0]?.message || 'Server is not available!'
         )
      }
   }

   return (
      <div className="relative flex">
         <div className="border-dark-100 mr-8 w-[201px] pr-6">Add Profile Photo</div>
         <GeneralInformationForm
            countryCityData={countryCityData || {}}
            onSubmitAction={handleSaveGeneralInformation}
            isLoading={isLoading}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
         />
         <hr className={'text-dark-100 absolute right-0 bottom-13 left-0 h-[1px] -translate-y-6'} />
      </div>
   )
}
