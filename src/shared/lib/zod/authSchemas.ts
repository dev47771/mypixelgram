import { z } from 'zod'

export const usernameSchema = z
   .string()
   .min(6, 'Minimum number of characters is 6')
   .max(30, 'Maximum number of characters is 30')
   .regex(/^[0-9A-Za-z_-]+$/, 'Only letters, numbers, underscores and dashes allowed')

export const emailSchema = z.email({
   message: 'The email must match the format example@example.com',
})

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{6,20}$/

export const passwordSchema = z
   .string()
   .min(6, { message: 'Minimum number of characters is 6' })
   .max(20, { message: 'Maximum number of characters is 20' })
   .regex(passwordRegex, {
      message:
         'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
   })

export const confirmPasswordSchema = passwordSchema
