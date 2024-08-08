import React, { FC, useEffect, useMemo, useState } from 'react'
import css from './NotDesktop.module.scss'
import Image from 'next/image'
import translate from '@/i18n/translate'

const NotDesktop: FC = () => {
   return (
      <div className={css.wrapper}>
         <div className={css.image}>
            <Image src='/assets/images/not-desktop.jpg' fill alt='not desktop' />
         </div>
         <p>{translate('not-desktop')}</p>
      </div>
   )
}

export default NotDesktop
