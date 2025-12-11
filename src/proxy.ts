import { NextRequest, NextResponse } from 'next/server'
import { BASE_URL } from '@/shared/constants'
import { AuthEndpoints, PublicRoutes } from '@/shared/enums'

export async function proxy(request: NextRequest) {
   const refreshToken = request.cookies.get('refreshToken')?.value

   if (!refreshToken) {
      return NextResponse.redirect(new URL(PublicRoutes.signIn, request.url))
   }

   try {
      const response = await fetch(`${BASE_URL}${AuthEndpoints.refreshToken}`, {
         method: 'POST',
         headers: {
            Cookie: `refreshToken=${refreshToken}`,
         },
      })

      if (!response.ok) {
         const res = NextResponse.redirect(new URL(PublicRoutes.signIn, request.url))
         res.cookies.delete('refreshToken')
         return res
      }

      const data = await response.json()
      const setCookie = response.headers.get('set-cookie')

      const nextResponse = NextResponse.next()

      if (setCookie) {
         const newRefreshToken = setCookie.split(';')[0].split('=')[1]
         nextResponse.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 3600_00,
            domain: '.mypixelgram.ru',
         })
      }

      nextResponse.headers.set('x-access-token', data.accessToken)

      return nextResponse
   } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/error', request.url))
   }
}

export const config = {
   matcher: ['/profile/:login([^/]+)'],
}
