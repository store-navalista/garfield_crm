import * as React from 'react'
import css from './MenuToggler.module.scss'
import Image from 'next/image'
import useActiveID from '@/hooks/useActiveID'
import { useMenuHandler } from '@/hooks/useMenuHandler'

export const MenuToggle: React.FC<{ toggle: () => void }> = ({ toggle }) => {
   const activeID = useActiveID()
   const handler = useMenuHandler('greating')

   return (
      <>
         <button className={css.togler_wrapper} onClick={toggle}>
            <div className={css.toggler}>
               <input type='checkbox' />
               <svg style={{ height: '30px' }}>
                  <use href='#menu' />
                  <use href='#menu' />
               </svg>
            </div>

            <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
               <symbol viewBox='0 0 100 56' id='menu'>
                  <path d='M48.33,45.6H18a14.17,14.17,0,0,1,0-28.34H78.86a17.37,17.37,0,0,1,0,34.74H42.33l-21-21.26L47.75,4' />
               </symbol>
            </svg>
         </button>
         <button onClick={handler} className={css.to_main}>
            <div>
               <Image src={'/assets/images/svg/dashboard-nav-to-main.svg'} alt='icon service' fill />
            </div>
         </button>
      </>
   )
}
