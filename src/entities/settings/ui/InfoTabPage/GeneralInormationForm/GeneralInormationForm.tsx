'use client'

import { CountrySelect, CitySelect } from './CountryCitySelect/CountryCitySelect'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { generalInformationSchema } from '@/entities/settings/schema/GeneralInformationSchema'
import { ControlledInput, ControlledTextarea } from '@/shared/components/Controlled'
import { ControlledDatePicker } from '@/shared/components/Controlled/ControlledDatePicker'
import { CountriesResponse } from '@/features/settings/api/settings.types'

type FormTypes = z.infer<typeof generalInformationSchema>

type Props = {
   countryCityData: CountriesResponse
   onSubmitAction: (data: FormTypes) => void
   isLoading: boolean
   errorsFromApi?: { field: string; message: string }[] | undefined
}

export const GeneralInformationForm = ({
   countryCityData,
   onSubmitAction,
   isLoading,
   errorsFromApi,
}: Props) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
      setError,
   } = useForm<FormTypes>({
      defaultValues: {
         login: '',
         firstName: '',
         lastName: '',
         dateOfBirth: '',
         country: '',
         city: '',
         aboutMe: '',
      },
      resolver: zodResolver(generalInformationSchema),
   })

   useEffect(() => {
      errorsFromApi?.forEach(error => {
         setError(error.field as keyof FormTypes, { message: error.message })
      })
   }, [errorsFromApi, setError])

   const [country, setCountry] = useState<string>('')
   const [city, setCity] = useState<string>('')

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
         />
         <ControlledInput
            name="firstName"
            label="First Name"
            type="text"
            required
            control={control}
            errorMessage={errors.firstName?.message}
         />
         <ControlledInput
            name="lastName"
            label="Last Name"
            type="text"
            required
            control={control}
            errorMessage={errors.lastName?.message}
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
            <CountrySelect
               coutryCityData={countryCityData}
               value={country}
               onValueChange={value => {
                  setCountry(value)
                  setCity('')
               }}
            />
            <CitySelect
               coutryCityData={countryCityData}
               country={country}
               value={city}
               onValueChange={setCity}
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
         <button
            type="submit"
            className="mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            disabled={isLoading}
         >
            Save Changes
         </button>
      </form>
   )
}
