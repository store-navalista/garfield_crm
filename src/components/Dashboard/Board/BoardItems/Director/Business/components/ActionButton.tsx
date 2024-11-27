import React, { FC } from 'react'
import css from './Buttons.module.scss'
import Image from 'next/image'
import { GlobalWorksTypes } from '@/constants/works'

type ActionButtonType = {
   id?: string
   button_type: 'save' | 'delete' | 'add' | 'rate'
   table_type?: GlobalWorksTypes
   handler(): Promise<void> | void
   isLoading: boolean
}

const ActionButton: FC<ActionButtonType> = ({ button_type, table_type, id, handler, isLoading }) => {
   const getBGImage = () => {
      switch (button_type) {
         case 'save':
            return 'job-save.svg'
         case 'rate':
            return 'dashboard-get-rate.svg'
         default:
            return ''
      }
   }

   return (
      <div className={css[button_type]}>
         {isLoading ? <Image src={'/assets/images/svg/simple-loader.svg'} width={20} height={20} alt='loader' /> : null}
         {!isLoading ? (
            <button style={{ backgroundImage: `url(/assets/images/svg/${getBGImage()})` }} onClick={handler} />
         ) : null}
      </div>
   )
}

export default ActionButton
