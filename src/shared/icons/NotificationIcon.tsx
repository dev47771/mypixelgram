import React, { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'

type Props = {
   count?: number
} & ComponentPropsWithoutRef<'svg'>

export const NotificationIcon = ({ count, className, ...rest }: Props) => {
   return (
      <svg
         viewBox="0 0 24.0007 24"
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         width="24.000732"
         height="24.000000"
         fill="none"
         className={clsx('translate-x-[3.5px]', className)}
         {...rest}
      >
         <rect
            id="Outline bell"
            width="24.000000"
            height="24.000000"
            x="0.000732"
            y="0.000000"
            fill="currentColor"
            fillOpacity="0"
         />
         <path
            id="Mask"
            d="M15.7203 15.404L17.5213 17.208C17.9903 17.677 18.1283 18.377 17.8733 18.991C17.6193 19.604 17.0273 20 16.3633 20L13.0003 20L13.0003 20.341C13.0003 22.359 11.2063 24 9.00034 24C6.79434 24 5.00034 22.359 5.00034 20.341L5.00034 20L1.63734 20C0.973335 20 0.380335 19.604 0.125335 18.99C-0.128665 18.377 0.0103353 17.678 0.479335 17.208L2.28034 15.404L2.28134 10.727C2.28134 8.79299 3.11934 6.94899 4.58334 5.66699C6.03834 4.39099 7.97834 3.80399 9.90034 4.05999C13.2183 4.49899 15.7203 7.45599 15.7203 10.937L15.7203 15.404ZM3.69534 16.818L2.51534 18L15.4863 18L14.3053 16.817C13.9283 16.44 13.7203 15.938 13.7203 15.404L13.7203 10.937C13.7203 8.45499 11.9653 6.35099 9.63834 6.04199C8.26134 5.86099 6.93933 6.26099 5.90134 7.17099C4.87134 8.07299 4.28134 9.36999 4.28134 10.727L4.28134 15.404C4.28134 15.938 4.07334 16.44 3.69534 16.818ZM11.0003 20.341C11.0003 21.24 10.0843 22 9.00034 22C7.91634 22 7.00034 21.24 7.00034 20.341L7.00034 20L11.0003 20L11.0003 20.341Z"
            fill="currentColor"
            fillRule="evenodd"
         />
         {count && count > 0 && (
            <>
               <circle cx="17.5" cy="6.5" r="6.5" fill="rgb(204,20.4,57.1201)" />
               <text
                  x="17.8"
                  y="7"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="white"
               >
                  {count}
               </text>
            </>
         )}
      </svg>
   )
}
