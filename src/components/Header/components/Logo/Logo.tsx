import React, { FC } from 'react'
import css from './Logo.module.scss'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Link from 'next/link'
import { ContentActions } from '@/store/reducers/contentReducer'

type LType = 'decor' | 'main'

const Logo: FC<{ type?: LType }> = ({ type }) => {
   const isMobile = useAppSelector((state) => state.reducer.content.mediaQuery.isMobile)
   const dispatch = useAppDispatch()

   const TypeLogo = (props) => {
      switch (props.type) {
         case 'decor':
            return !isMobile ? (
               <div className={css.decor}>
                  <Image src='/assets/images/svg/logo.svg' alt='Logo decor' width={130} height={20} />
               </div>
            ) : null
         default:
            return !isMobile ? (
               <Link className={css.main} href='/' onClick={() => dispatch(ContentActions.setID('HOME'))} />
            ) : null
      }
   }

   return <TypeLogo type={type} />
}

export default Logo
