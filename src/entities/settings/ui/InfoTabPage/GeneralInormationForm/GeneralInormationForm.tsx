'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { generalInformationSchema } from '@/entities/settings/schema/GeneralInformationSchema'
import { ControlledInput, ControlledTextarea } from '@/shared/components/Controlled'
import { ControlledDatePicker } from '@/shared/components/Controlled/ControlledDatePicker'
import { CountriesResponse, getProfileResponse } from '@/features/settings/api/settings.types'
import { ControlledSelect } from '@/shared/components/Controlled/ControlledSelect'
import { Button } from '@/shared/components/Button'
import { dateFormatter } from '@/shared/utils/date/dateFormatter'

type FormTypes = z.infer<typeof generalInformationSchema>

type Props = {
   profileData?: getProfileResponse
   countryCityData: CountriesResponse
   onSubmitAction: (data: FormTypes) => void
   isLoading: boolean
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const GeneralInformationForm = ({
   profileData,
   countryCityData,
   onSubmitAction,
   isLoading,
   errorsFromApi,
}: Props) => {
   const safeProfileData = profileData || {
      login: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      country: '',
      city: '',
      aboutMe: '',
   }

   const {
      control,
      reset,
      formState: { isValid, errors },
      handleSubmit,
      setError,
      watch,
   } = useForm<FormTypes>({
      defaultValues: {
         login: safeProfileData.login,
         firstName: safeProfileData.firstName || '',
         lastName: safeProfileData.lastName || '',
         dateOfBirth: safeProfileData.dateOfBirth || '',
         country: safeProfileData.country || '',
         city: safeProfileData.city || '',
         aboutMe: safeProfileData.aboutMe || '',
      },
      resolver: zodResolver(generalInformationSchema),
      mode: 'onChange',
   })

   useEffect(() => {
      if (profileData) {
         reset({
            login: profileData.login,
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            dateOfBirth: dateFormatter.serverToForm(profileData.dateOfBirth || ''),
            country: profileData.country || '',
            city: profileData.city || '',
            aboutMe: profileData.aboutMe || '',
         })
      }
   }, [profileData, reset])

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof FormTypes, { message: error.message })
      })
   }, [errorsFromApi, setError])

   const selectedCountry = watch('country')

   return (
      <form
         onSubmit={handleSubmit(onSubmitAction)}
         className="flex w-full max-w-[740px] flex-col gap-[24px]"
      >
         <ControlledInput
            name="login"
            label="Username"
            type="text"
            required
            control={control}
            errorMessage={errors.login?.message}
            errorPosition="absolute"
         />
         <ControlledInput
            name="firstName"
            label="First Name"
            type="text"
            required
            control={control}
            errorMessage={errors.firstName?.message}
            errorPosition="absolute"
         />
         <ControlledInput
            name="lastName"
            label="Last Name"
            type="text"
            required
            control={control}
            errorMessage={errors.lastName?.message}
            errorPosition="absolute"
         />
         <ControlledDatePicker
            name="dateOfBirth"
            label="Date of birth"
            required
            control={control}
            errorMessage={errors.dateOfBirth?.message}
            className="w-full"
         />
         <div className="flex gap-[24px]">
            <ControlledSelect
               name="country"
               control={control}
               label="Select your country"
               placeholder="Country"
               options={Object.keys(countryCityData)}
            />
            <ControlledSelect
               name="city"
               control={control}
               label="Select your city"
               placeholder="City"
               options={selectedCountry ? countryCityData[selectedCountry] || [] : []}
               disabled={!selectedCountry}
            />
         </div>
         <div className="flex flex-col">
            <ControlledTextarea
               name="aboutMe"
               label="About Me"
               placeholder="Tell something about you"
               control={control}
               errorMessage={errors.aboutMe?.message}
               maxLength={200}
            />
         </div>

         <Button
            type="submit"
            className="mt-[48px] ml-auto w-[159px] rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            disabled={!isValid || isLoading}
         >
            Save Changes
         </Button>
      </form>
   )
}
