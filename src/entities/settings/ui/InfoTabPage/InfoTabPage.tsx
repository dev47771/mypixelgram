import {
   useGetCountriesWithCitiesQuery,
   useUpdateProfileMutation,
} from '@/features/settings/api/settings.service'
import { GeneralInformationForm } from './GeneralInormationForm/GeneralInormationForm'
import { updateProfileArgs } from '@/features/settings/api/settings.types'
import { isErrorInDataResponse } from '@/shared/utils'

export const InfoTabPage = () => {
   const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
   const { data: countryCityData } = useGetCountriesWithCitiesQuery()

   const handleSaveGeneralInformation = async (data: updateProfileArgs) => {
      const formattedData = {
         ...data,
         dateOfBirth: new Date(data.dateOfBirth.split('.').reverse().join('-')).toISOString(),
      }
      await updateProfile(formattedData).unwrap()
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
