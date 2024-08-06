import React, { CSSProperties, FC } from 'react'
import css from './Tooltip.module.scss'
import { useAppSelector } from '@/hooks/redux'
import translate from '@/i18n/translate'

type TooltipProps = {
   content: string
   isShow?: boolean
   correctPosition?: [number, number]
}

const Tooltip: FC<TooltipProps> = ({ content, correctPosition = [0, 0], isShow = true }) => {
   const isLaptop = useAppSelector((state) => state.reducer.content.mediaQuery.isLaptop)

   return !isLaptop && isShow ? (
      <p
         style={{ '--bottom': `${correctPosition[0]}px`, '--left': `${correctPosition[1]}px` } as CSSProperties}
         className={css.tooltip}
      >
         {translate(`tooltip.header-${content}`)}
      </p>
   ) : null
}

export default Tooltip
