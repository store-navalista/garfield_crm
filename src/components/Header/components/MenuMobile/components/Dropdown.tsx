import { CONTACTS } from '@/constants/data'
import { MENU, PAGES, SERVICES } from '@/constants/pages'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { PagesData } from '@/i18n/pages/locales'
import translate from '@/i18n/translate'
import { ContentActions } from '@/store/reducers/contentReducer'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import LanguageSwitcher from '../../QuickPanel/LanguageSwitcher/LanguageSwitcher'
import css from '../MenuMobile.module.scss'
import useOverflow from '@/hooks/useOverflow'

type Props = {
   activeTab: number
   setActiveTab?: React.Dispatch<React.SetStateAction<number>>
   lang?: string
   toggle?(): React.Dispatch<React.SetStateAction<boolean>>
}

const Social: FC = () => {
   return (
      <div className={css.social}>
         {['telegram', 'instagram', 'facebook', 'mail'].map((s, i) => {
            return (
               <a
                  href={CONTACTS[s]}
                  key={i}
                  style={{ '--social-icon': `url(/assets/images/svg/mobile-${s}.svg)` } as CSSProperties}
                  target='_blank'
                  rel='noreferrer'
                  className={css.button}
               />
            )
         })}
      </div>
   )
}

const Tabs: FC<Props> = ({ activeTab, setActiveTab, toggle }) => {
   return (
      <div className={css.tabs}>
         {['home', 'ship', 'repair', 'survey', 'legal', 'build'].map((b, i) => {
            return (
               <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  data-active={i === activeTab}
                  style={{ '--icon': `url(/assets/images/svg/tab-${b}.svg)` } as CSSProperties}
                  className={css.button}
               />
            )
         })}
      </div>
   )
}

const Body: FC<Props> = ({ activeTab, lang, toggle }) => {
   const isMobile = useAppSelector((state) => state.reducer.content.mediaQuery.isMobile)
   const [title, pages] = Object.entries(MENU[activeTab])[0]
   const pagesConstants = [...PAGES, ...SERVICES]
   const pagesContents = { ...PagesData[lang].pages, ...PagesData[lang].services }
   const currentPage = useAppSelector((state) => state.reducer.content.currentPage)
   const dispatch = useAppDispatch()

   return (
      <div className={css.links}>
         {pages.map((n, i) => {
            const [page] = Object.values(pagesConstants.find((p) => n in p))
            const { mobile_title } = pagesContents[n]
            const { release } = page

            const active = page.path === currentPage

            return (
               <div key={i} data-active={active}>
                  <span />
                  <Link
                     href={page.path}
                     className={css.link}
                     onClick={() => {
                        dispatch(ContentActions.setID(n))
                        if (isMobile) toggle()
                     }}
                  >
                     {mobile_title}
                  </Link>
                  {release ? <div className={css.release} /> : null}
               </div>
            )
         })}
      </div>
   )
}

const Dropdown: FC<any> = ({ isOpen, toggle }) => {
   const isMobile = useAppSelector((state) => state.reducer.content.mediaQuery.isMobile)
   const lang = useAppSelector((state) => state.reducer.content.i18n)
   const [activeTab, setActiveTab] = useState(0)
   const [title] = Object.entries(MENU[activeTab])[0]
   const startCoord = { x: 36, y: 90 }
   const [position, setPosition] = useState(startCoord)
   const [offset, setOffset] = useState({ x: 0, y: 0 })

   const dragImageRef = useRef()

   const onDrag = (e) => {
      if (e.clientX === 0 && e.clientY === 0) {
         return
      }
      setPosition({
         x: e.clientX - offset.x,
         y: e.clientY - offset.y
      })
   }

   const onDragStart = (e) => {
      const rect = e.target.getBoundingClientRect()
      setOffset({
         x: e.clientX - rect.left,
         y: e.clientY - rect.top
      })
   }

   const draggableStyle = {
      left: `${position.x}px`,
      top: `${position.y}px`
   }

   const staticStyle = {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
   }

   useEffect(() => {
      return () => {
         setActiveTab(0)
         setPosition(startCoord)
      }
   }, [isOpen])

   useOverflow(isOpen && isMobile)

   return isOpen ? (
      <>
         <AnimatePresence mode='wait'>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={css.wrapper}
               >
                  <div
                     style={!isMobile ? draggableStyle : staticStyle}
                     onDragStart={onDragStart}
                     onDrag={onDrag}
                     draggable={!isMobile}
                     className={css.dropdown}
                  >
                     <div className={css.header}>
                        <span />
                        <h4>{translate(`menu.title-${title}`)}</h4>
                        <button onClick={() => toggle()} className={css.close} />
                     </div>
                     <Body lang={lang} activeTab={activeTab} toggle={toggle} />
                     <LanguageSwitcher type='mobile' />
                     <Tabs toggle={toggle} activeTab={activeTab} setActiveTab={setActiveTab} />
                     <Social />
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
         <div ref={dragImageRef} style={{ display: 'none' }}></div>
      </>
   ) : null
}

export default Dropdown
