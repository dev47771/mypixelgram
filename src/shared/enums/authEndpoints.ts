export enum AuthEndpoints {
   me = '/auth/me',
   logout = '/auth/logout',
   signUp = '/auth/register',
   confirmEmail = '/auth/registration-confirmation',
   login = '/auth/login',
   passwordRecovery = `/auth/recover-password`,
   reCaptcha = '/auth/recaptcha',
   checkRecoveryCode = `/auth/check-recovery-code`,
   newPassword = `/auth/new-password`,
   refreshToken = `/auth/refresh-token`,
   resendEmail = '/auth/registration-email-resending',
}
