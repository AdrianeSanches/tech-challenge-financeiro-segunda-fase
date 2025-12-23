import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface InfosCardProps {
  title: string
  description: string
  Svg: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

export function InfosCard({ title, description, Svg }: InfosCardProps) {
  return (
    <div className="border-[1px]border-foreground rounded-[16px] p-[14px] flex flex-col items-center justify-center [box-shadow:0px_5px_15px_rgba(0,_0,_0,_0.5)]">
      <div className="flex items-center justify-center md:flex-col gap-[6px] mb-[6px] md:mb-[0px]">
        <Svg className="h-8 w-8 md:h-9 md:w-9 text-text-infos" />
        <h1 className="text-text-infos text-center text-[14px] md:text-[16px] font-medium mb-[0px] md:mb-[6px]">
          {title}
        </h1>
      </div>
      <p className="text-[12px] md:text-[14px] text-center">{description}</p>
    </div>
  )
}

