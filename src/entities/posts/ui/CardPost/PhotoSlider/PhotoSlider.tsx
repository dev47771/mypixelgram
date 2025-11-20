import { Slider } from '@/shared/components/Slider'
import { cn } from '@/shared/lib'

type Props = {
   images: string[]
   expanded: boolean
   onToggle?: () => void
}

export const PhotoSlider = ({ images, expanded }: Props) => (
   <div
      className={cn(
         'mb-3 w-[234px] overflow-hidden transition-all duration-300',
         expanded ? 'h-[115px]' : 'h-[240px]'
      )}
   >
      <Slider images={images} disabled={expanded} className="h-[240px] w-[234px]" />
   </div>
)
