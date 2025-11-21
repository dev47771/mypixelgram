import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   /* config options here */

   //to download images from other hosts
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'images.unsplash.com',
         },
         {
            protocol: 'https',
            hostname: 'mypixelgram.ru',
         },
         {
            protocol: 'https',
            hostname: 'randomuser.me',
         },
      ],
      //проверить на необходимость, изза изображений Image при обрезке в кропе
      // domains: ['localhost'], // ваши домены
      // dangerouslyAllowSVG: true,
      // contentDispositionType: 'attachment',
      // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
   },
}

export default nextConfig
