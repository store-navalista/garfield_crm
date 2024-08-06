import ConditionalLink from '@/components/UI/conditional-link/ConditionalLink'
import { useAppSelector } from '@/hooks/redux'
import useHover from '@/hooks/useHover'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useMediaQuery } from 'react-responsive'
import { CSSTransition } from 'react-transition-group'
import css from './ServiceItem.module.scss'

const ServiceItem: FC<{ service: { [key: string]: any }; id: string }> = ({ service, id }) => {
   const isLaptop = useAppSelector((state) => state.reducer.content.mediaQuery.isLaptop)
   const isSmallScreen = useMediaQuery({ query: '(max-width: 420px)' })
   const intl = useIntl()
   const ref = useRef(null)
   const isHover = useHover(ref)
   const { title, description, disabled, path, image, submenu } = service
   const [width, height] = isSmallScreen ? [320, 320] : [400, 400]

   return (
      <>
         <div ref={ref} className={`${css.wrapper}${isHover || isLaptop ? ` ${css.hover}` : ''}`}>
            <ConditionalLink href={`/${path}`} className={css.block} id={id} disabled={disabled as boolean}>
               <div className={css.membrane} />
               <div className={css.frame} />
               <Image
                  src={`/assets/images/pages/main/${image}`}
                  alt={'service'}
                  width={width}
                  height={height}
                  className={css.image}
               />
               <div className={css.textbox}>
                  <h2>{title}</h2>
                  <span />
                  <p>{description}</p>
               </div>
            </ConditionalLink>
            <CSSTransition
               in={isHover}
               timeout={300}
               classNames={{
                  enter: css.enter,
                  enterActive: css.enterActive,
                  exit: css.exit,
                  exitActive: css.exitActive
               }}
               unmountOnExit
            >
               <div className={css.submenu}>
                  {submenu?.works && (
                     <Link href={submenu.works} legacyBehavior>
                        <a
                           title={intl.formatMessage({ id: `main.service-work`, defaultMessage: 'Our works' })}
                           className={css.works}
                        />
                     </Link>
                  )}
                  {submenu?.brochure && (
                     <Link href={submenu.brochure} legacyBehavior>
                        <a
                           title={intl.formatMessage({ id: `main.service-brochure`, defaultMessage: 'See brochure' })}
                           className={css.brochure}
                        />
                     </Link>
                  )}
               </div>
            </CSSTransition>
         </div>
      </>
   )
}

export default ServiceItem
