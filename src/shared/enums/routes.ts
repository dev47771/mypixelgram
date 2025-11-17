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
   profile = '/profile', //нужно будет удалить
   settings = '/profile/settings',
   favorites = '/favorites',
   feed = '/feed',
   messenger = '/messenger',
   search = '/search',
   statistics = '/statistics',
}

export const profileRoutes = {
   private: (id: string) => `/profile/${id}`,
   public: (id: string) => `/profile/${id}/public`,
}
