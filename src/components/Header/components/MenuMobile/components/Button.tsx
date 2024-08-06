import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import css from '../MenuMobile.module.scss'
import Tooltip from '@/components/UI/tooltip/Tooltip'
import useHover from '@/hooks/useHover'

interface Button {
   isOpen: boolean
   toggle: Dispatch<SetStateAction<boolean>>
}

const Button: FC<Button> = ({ isOpen, toggle }) => {
   const ref = useRef(null)
   const isHovering = useHover(ref)
   return (
      <button ref={ref} data-shown={isOpen} className={css.button} onClick={() => toggle(!isOpen)}>
         <div className={css.icon}>
            <span />
            <span />
            <span />
         </div>
         <Tooltip content='menu' isShow={isHovering && !isOpen} />
      </button>
   )
}

export default Button
