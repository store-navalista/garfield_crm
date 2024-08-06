import { TServicesObjectProps } from '@/constants/types'
import { useAppSelector } from '@/hooks/redux'
import Image from 'next/image'
import React, { FC, useRef } from 'react'
import { useIntl } from 'react-intl'
import HeadingMain from '../heading-main/HeadingMain'
import css from './MainBlock.module.scss'
import MainBlockService from './MainBlockService'

const MainBlock: FC<{ content: TServicesObjectProps }> = ({ content }) => {
   const isLaptop = useAppSelector((state) => state.reducer.content.mediaQuery.isLaptop)
   const ref = useRef()
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })
   const blocks = ['SD', 'BWTS', 'IHM', 'SCANSURV'].map((s) => ({ [s]: content[s] })) as TServicesObjectProps[]

   return (
      <div className={css.wrapper}>
         <Image
            style={{ borderRadius: '14px', objectFit: 'cover' }}
            src='/assets/images/pages/main-bg.jpg'
            alt='Background Image'
            fill
            priority={true}
         />
         <div className={css.heading}>
            <HeadingMain title={staticTranslate('title.company')} />
            <span>&#129045; HOVER</span>
         </div>
         <div ref={ref} className={css.services}>
            <MainBlockService blocks={blocks} />
         </div>
      </div>
   )
}

export default MainBlock
