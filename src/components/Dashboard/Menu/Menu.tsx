import useUserByID from '@/hooks/useUserByID'
import translate from '@/i18n/translate'
import { motion } from 'framer-motion'
import * as React from 'react'
import css from './Menu.module.scss'
import { MenuToggle } from './MenuToggle'
import { Navigation } from './Navigation'

export const Menu: React.FC<{ isOpen: boolean; toggleOpen: () => void }> = ({ isOpen, toggleOpen }) => {
   const { data: user } = useUserByID()

   if (!user) return

   return (
      <>
         <MenuToggle toggle={() => toggleOpen()} />
         <motion.nav
            className={css.wrapper}
            style={
               {
                  '--shadow': isOpen ? 'var(--shadow-out)' : 'none',
                  zIndex: isOpen ? 5 : -1,
                  backgroundColor: isOpen ? '#fff' : 'transparent'
               } as React.CSSProperties
            }
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
         >
            <Navigation isOpen={isOpen} user={user} />
            <h3 style={{ '--opacity': isOpen ? 1 : 0 } as React.CSSProperties} className={css.author}>
               {translate('dashboard.nav-author')}
            </h3>
         </motion.nav>
      </>
   )
}
