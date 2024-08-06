import React, { CSSProperties, FC } from 'react'
import css from './IconTooltip.module.scss'

type TIconTooltip = { image: string; message: string } & React.DetailedHTMLProps<
   React.HTMLAttributes<HTMLDivElement>,
   HTMLDivElement
>

export const IconTooltip: FC<TIconTooltip> = ({ image, message, ...rest }) => {
   return (
      <div className={`${css.wrapper} ${rest.className}`}>
         <span className={css.tooltip}>{message}</span>
         <span className={css.image} style={{ '--bg-image': `url(${image})` } as CSSProperties} />
      </div>
   )
}
