import { CONTACTS } from '@/constants/data'
import translate from '@/i18n/translate'
import { ILayoutComponentProps } from '@/types/layout'
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import css from './FooterMenu.module.scss'

const FooterMenu: FC<ILayoutComponentProps> = ({ scrollStep, isFooterMenuOpen }) => {
   const [isDescription, setisDescription] = useState(false)
   const [isScroll, setisScroll] = useState(false)
   const [isBlocks, setisBlocks] = useState(false)
   const refs = useRef<HTMLAnchorElement[]>([])

   useEffect(() => {
      if (isDescription) setisDescription(false)
   }, [scrollStep])

   useEffect(() => {
      setisScroll(document.body.offsetHeight > window.innerHeight)
      setisBlocks(scrollStep > 0 || !isScroll)
   })

   return (
      <div className={css.wrapper}>
         <div className={css.section}>
            <div
               style={{ display: isFooterMenuOpen ? 'flex' : 'none', opacity: scrollStep === 0 ? 0 : 1 }}
               className={css.blocks + `${isDescription ? ' ' + css.active : ''}`}
            >
               {['address', 'phone', 'mail'].map((item, i) => {
                  return (
                     <CSSTransition
                        key={i}
                        in={isBlocks}
                        timeout={800}
                        mountOnEnter
                        unmountOnExit
                        classNames={{
                           enter: css.enter,
                           enterDone: css.enterDone
                        }}
                     >
                        <a
                           href={CONTACTS[item]}
                           className={css.block}
                           data-type={item}
                           ref={(e) => (refs.current[i] = e)}
                           target='_blank'
                           rel='noreferrer'
                           style={
                              {
                                 '--backgroundImage': `url(/assets/images/svg/footer-menu.${item}.svg)`
                              } as CSSProperties
                           }
                        />
                     </CSSTransition>
                  )
               })}
            </div>
            <div className={css.copyright}>
               <p>&#169; {translate(`footer-block.copyright`)}</p>
            </div>
         </div>
      </div>
   )
}

export default FooterMenu
