import React, { CSSProperties, FC } from 'react'
import css from './Table.module.scss'
import translate from '@/i18n/translate'

type HeadingProps = {
   data: string | Record<string, string[]>
   type?: 'left' | 'right'
   options?: CSSProperties
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>

export const Heading: FC<HeadingProps> = ({ data, type = 'left', options = {}, ...rest }) => {
   if (typeof data !== 'object') {
      return (
         <p {...rest} className={css.heading} data-type={type} style={options}>
            {translate(`business.table-${data}`)}
         </p>
      )
   } else {
      const [heading] = Object.keys(data)
      const [values] = Object.values(data)

      const getBoxWidth = (() => {
         switch (values.length) {
            case 2:
               return '230px'
            case 3:
               return '350px'
         }
      })()

      return (
         <div className={css.composite_heading} style={{ width: `${getBoxWidth}` }}>
            <p {...rest} className={css.heading}>
               {translate(`business.table-${heading}`)}
            </p>
            <div>
               {values.map((v, i) => (
                  <p {...rest} key={i} className={css.heading}>
                     {translate(`business.table-${v}`)}
                  </p>
               ))}
            </div>
         </div>
      )
   }
}
