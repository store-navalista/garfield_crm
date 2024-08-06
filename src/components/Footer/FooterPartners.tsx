import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import css from './FooterPartners.module.scss'
import translate from '@/i18n/translate'
import { PARTNERS } from '@/constants/partners'
import { useAppSelector } from '@/hooks/redux'

interface IFooterPartners {
   setisFooterMenu: Dispatch<SetStateAction<boolean>>
}

const FooterPartners: FC<IFooterPartners> = ({ setisFooterMenu }) => {
   const isLaptop = useAppSelector((state) => state.reducer.content.mediaQuery.isLaptop)
   const [isPoweredOpen, setisPoweredOpen] = useState(false)
   const [isCertifiedOpen, setisCertifiedOpen] = useState(false)
   const { certified, powered } = PARTNERS

   useEffect(() => {
      isPoweredOpen || isCertifiedOpen ? setisFooterMenu(false) : setisFooterMenu(true)
   }, [isPoweredOpen, isCertifiedOpen])

   return (
      <div className={css.wrapper}>
         <div className={css.block}>
            {!isLaptop ? (
               <button
                  onClick={() => setisPoweredOpen(!isPoweredOpen)}
                  className={css.powered + ` ${isPoweredOpen && css.active}`}
               >
                  {translate(`footer-partners.powered`)}
                  <span />
               </button>
            ) : null}
            {!isLaptop ? (
               <button
                  onClick={() => setisCertifiedOpen(!isCertifiedOpen)}
                  className={css.certified + ` ${isCertifiedOpen && css.active}`}
               >
                  <span />
                  {translate(`footer-partners.certified`)}
               </button>
            ) : null}
            {(isCertifiedOpen || isLaptop) && (
               <div className={`${css.menu} ${css.certified}`}>
                  {certified.map((item, i) => {
                     const { title, url, icon } = item
                     return (
                        <a
                           key={i}
                           title={title}
                           href={url}
                           target='_blank'
                           rel='noopener noreferrer'
                           style={{ backgroundImage: `url(/assets/images/components/partners/${icon})` }}
                        />
                     )
                  })}
               </div>
            )}
            {(isPoweredOpen || isLaptop) && (
               <div className={`${css.menu} ${css.powered}`}>
                  {powered.map((item, i) => {
                     const { title, url, icon } = item
                     return (
                        <a
                           key={i}
                           title={title}
                           href={url}
                           target='_blank'
                           rel='noopener noreferrer'
                           style={{ backgroundImage: `url(/assets/images/components/partners/${icon})` }}
                        />
                     )
                  })}
               </div>
            )}
         </div>
      </div>
   )
}

export default FooterPartners
