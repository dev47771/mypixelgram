import { cn } from '@/shared/lib'

type Props = {
   size?: string
   color?: string
   speed?: number
   fullscreen?: boolean
}

export function Loader({
   size = '2.8rem',
   color = 'var(--color-accent-500)',
   speed = 0.9,
   fullscreen = true,
}: Props) {
   return (
      <div className={cn('flex items-center justify-center', { 'fixed inset-0': fullscreen })}>
         <div
            className="relative flex items-center justify-center"
            style={{ height: size, width: size }}
         >
            {[...Array(8)].map((_, index) => (
               <div
                  key={index}
                  className="absolute top-0 left-0 flex h-full w-full items-center justify-start"
                  style={{ transform: `rotate(${index * 45}deg)` }}
               >
                  <div
                     className="animate-pulse-scale h-1/5 w-1/5 rounded-full opacity-50 shadow-lg"
                     style={{
                        backgroundColor: color,
                        animationDelay: `${-speed * (index * 0.125)}s`,
                        boxShadow: `0 0 20px ${color}30`,
                     }}
                  />
               </div>
            ))}
         </div>
      </div>
   )
}
