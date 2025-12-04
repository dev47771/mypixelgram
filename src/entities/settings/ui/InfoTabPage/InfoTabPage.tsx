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
            (error as ErrorResponse).errorsMessages[0].message || 'Server is not available!'
         )
      }
   }

   return (
      <div className="flex">
         <div className="mr-[31px] w-[201px] border-r">Add Profile Photo</div>
         <GeneralInformationForm
            countryCityData={countryCityData || {}}
            onSubmitAction={handleSaveGeneralInformation}
            isLoading={isLoading}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
         />
      </div>
   )
}
