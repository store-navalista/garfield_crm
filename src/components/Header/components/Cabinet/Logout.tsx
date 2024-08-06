import Tooltip from '@/components/UI/tooltip/Tooltip'
import useHover from '@/hooks/useHover'
import React, { FC, useRef } from 'react'
import css from './Cabinet.module.scss'

const Logout: FC<{ removeCookie: any }> = ({ removeCookie }) => {
   const hoverRef = useRef(null)
   const isHovering = useHover(hoverRef)

   const logout = () => {
      removeCookie('token')
      removeCookie('user_id')
   }

   return (
      <button
         onClick={logout}
         style={{ backgroundImage: 'url(/assets/images/svg/logout.svg)' }}
         ref={hoverRef}
         className={css.button}
      >
         <Tooltip content='logout' isShow={isHovering} />
      </button>
   )
}

export default Logout
