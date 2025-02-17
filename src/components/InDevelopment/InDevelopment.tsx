import React, { FC } from 'react'
import css from './InDevelopment.module.scss'
import Image from 'next/image'

const InDevelopment: FC = () => {
   return (
      <div className={css.wrapper}>
         <div className={css.image}>
            <Image src='/assets/images/dashboard/services/in-development.jpg' fill alt='in development' />
         </div>
         <p>This part is under development.</p>
      </div>
   )
}

export default InDevelopment
