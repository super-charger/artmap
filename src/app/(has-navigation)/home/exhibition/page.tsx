import { LAYOUT } from '@/constants/layout'
import { cn } from '@/utils/utils'

export default function ExhibitionPage() {
  return (
    <div
      className={cn(
        'min-h-[1000px] bg-slate-500',
        `pt-[${LAYOUT.HEADER.HEIGHT}]`,
      )}
    >
      ExhibitionPage
    </div>
  )
}
