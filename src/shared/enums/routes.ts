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

export const PrivateRoutes = {
   profile: '/profile', //нужно будет удалить
   settings: (login: string) => `/profile/${login}/settings`,
   favorites: '/favorites',
   feed: '/feed',
   messenger: '/messenger',
   search: '/search',
   statistics: '/statistics',
} as const

export const profileRoutes = {
   private: (login: string) => `/profile/${login}`,
   public: (login: string) => `/profile/${login}/public`,
}
