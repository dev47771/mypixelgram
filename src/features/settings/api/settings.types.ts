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
   firstName?: string | null
   lastName?: string | null
   dateOfBirth?: string | null
   country?: string | null
   city?: string | null
   aboutMe?: string | null
}

export type CountriesResponse = Record<string, string[]>

export type Country = keyof CountriesResponse

export type City = CountriesResponse[Country][number]
