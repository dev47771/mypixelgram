import { SettingsTabType } from '@/entities/settings/constants/settingTabValues'

export enum PublicRoutes {
   createNewPassword = '/create-new-password',
   forgotPassword = '/forgot-password',
   privacyPolicy = '/privacy-policy',
   signIn = '/sign-in',
   signUp = '/sign-up',
   signUpSuccess = '/sign-up-success',
   termsOfService = '/terms-of-service',
   verificationExpired = '/verification-expired',
   main = '/',
}

export enum PrivateRoutes {
   favorites = '/favorites',
   feed = '/feed',
   messenger = '/messenger',
   search = '/search',
   statistics = '/statistics',
}

export const profileRoutes = {
   private: (login: string) => `/profile/${login}`,
   public: (login: string) => `/profile/${login}/public`,
   settings: {
      base: (login: string) => `/profile/${login}/settings`,
      create: (login: string, part: SettingsTabType) => `/profile/${login}/settings?part=${part}`,
   },
}

export const settingsRoutes = {
   base: `/profile/settings`,
   create: (part: SettingsTabType) => `/profile/settings?part=${part}`,
}
