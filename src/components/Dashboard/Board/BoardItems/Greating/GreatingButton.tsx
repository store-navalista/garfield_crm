import translate from '@/i18n/translate'
import Image from 'next/image'
import React, { FC, Fragment } from 'react'
import css from './Greating.module.scss'
import { useMenuHandler } from '@/hooks/useMenuHandler'
import { TBoardItem } from '@/constants/dashboard'

const GreatingButton: FC<{ b: TBoardItem; i: number }> = ({ b, i }) => {
   const { id, icon, title } = b
   const handler = useMenuHandler(id)

   const position = () => {
      if (i < 6) {
         return { left: `${30 + 68 * i}px` }
      } else if (i >= 6 && i < 12) {
         return { left: 'auto', right: `${-80}px`, top: `${35 + 65 * (i - 6)}px` }
      }
   }

   return (
      <>
         <button onClick={handler} style={position()} className={css.quick_btn}>
            <div>
               <Image src={`/assets/images/svg/${icon}`} alt='icon service' fill />
            </div>
         </button>
         <p className={css.tip}>{translate(title)}</p>
      </>
   )
}

export default GreatingButton
