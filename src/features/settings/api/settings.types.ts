export type updateProfileArgs = {
   login: string
   firstName: string
   lastName: string
   dateOfBirth: string
   country?: string
   city?: string
   aboutMe?: string
}

export type getProfileResponse = {
   login: string
   firstName?: string
   lastName?: string
   dateOfBirth?: string
   country?: string
   city?: string
   aboutMe?: string
}

export type CountriesResponse = {
   [country: string]: string[]
}

export type Country = keyof CountriesResponse

export type City = CountriesResponse[Country][number]
