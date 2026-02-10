import { SettingsTabType } from '@/features/settings/constants/settingTabValues'

export const ROUTES = {
   public: {
      createNewPassword: '/create-new-password',
      forgotPassword: '/forgot-password',
      privacyPolicy: '/privacy-policy',
      signIn: '/sign-in',
      signUp: '/sign-up',
      signUpSuccess: '/sign-up-success',
      termsOfService: '/terms-of-service',
      verificationExpired: '/verification-expired',
      main: '/',
   },

   private: {
      profile: '/profile',
      settings: '/profile/settings',
      favorites: '/favorites',
      feed: '/feed',
      messenger: '/messenger',
      search: '/search',
      statistics: '/statistics',
   },

   profile: {
      private: (login: string) => `/profile/${login}`,
      public: (login: string) => `/profile/${login}/public`,
   },

   settings: {
      base: '/profile/settings',
      create: (part: SettingsTabType) => `/profile/settings?part=${part}`,
   },
} as const
