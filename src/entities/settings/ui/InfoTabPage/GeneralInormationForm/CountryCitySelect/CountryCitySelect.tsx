'use client'

import { CountriesResponse } from '@/features/settings/api/settings.types'
import { Label } from '@/shared/components/Label'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/Select'

type CountrySelectProps = {
   coutryCityData: CountriesResponse
   value?: string
   onValueChange: (value: string) => void
}

export const CountrySelect = ({ coutryCityData, value, onValueChange }: CountrySelectProps) => {
   const countries = Object.keys(coutryCityData)

   return (
      <div className="w-full">
         <Label className="text-sm font-medium">Select your country</Label>
         <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
               {countries.map(country => (
                  <SelectItem key={country} value={country}>
                     {country}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   )
}

type CitySelectProps = {
   coutryCityData: CountriesResponse
   country: string
   value?: string
   onValueChange: (value: string) => void
}

export const CitySelect = ({ coutryCityData, country, value, onValueChange }: CitySelectProps) => {
   const cities = country ? coutryCityData[country] : []

   return (
      <div className="w-full">
         <Label className="text-sm font-medium">Select your city</Label>
         <Select value={value} onValueChange={onValueChange} disabled={!country}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
               {cities.map(city => (
                  <SelectItem key={city} value={city}>
                     {city}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   )
}
