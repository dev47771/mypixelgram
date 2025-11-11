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
   },
}

export default nextConfig
