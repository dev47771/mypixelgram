import { z } from 'zod'
export const passwordRegex = new RegExp(
   '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?~`]).+$'
)

export const passwordSchema = z
   .string()
   .min(6, 'Minimum number of characters 6')
   .max(20, 'Maximum number of characters 20')
   .regex(
      passwordRegex,
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
   )
