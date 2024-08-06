import React, { ButtonHTMLAttributes, CSSProperties, FC, MutableRefObject } from 'react'
import css from './Button.module.scss'
import Link from 'next/link'

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
   isOpen?: boolean
   href?: string
   btnType?: 'button' | 'link'
   icon?: string
   className?: string
   ref?: MutableRefObject<HTMLButtonElement>
}

const Button: FC<TButton> = ({ type = 'link', href, isOpen = false, onClick, icon, className, ref, children }) => {
   switch (type) {
      case 'button':
         return (
            <button
               ref={ref}
               data-open={isOpen}
               onClick={onClick}
               className={css.button + ` ${className ? className : ''}`}
            >
               {children}
            </button>
         )
      case 'link':
         return (
            <Link href={href} legacyBehavior>
               <a
                  onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
                  style={{ '--icon': icon } as CSSProperties}
                  className={css.button}
               >
                  {children}
               </a>
            </Link>
         )
   }
}

export default Button
