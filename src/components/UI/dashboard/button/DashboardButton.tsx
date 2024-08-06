import React, { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, FC, InputHTMLAttributes, useRef } from 'react'
import css from './DashboardButton.module.scss'

type TIconTooltip = {
   btn_type: string
   tooltip?: { message?: string; position?: [string, string] }
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
   DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const DashboardButton: FC<TIconTooltip> = ({ btn_type, tooltip, ...rest }) => {
   if (tooltip) tooltip.position = ['35px', '50%']
   const fileInputRef = useRef<HTMLInputElement>(null)

   switch (btn_type) {
      case 'icon-btn':
         return (
            <div className={`${css.wrapper} ${rest.className}`}>
               <button style={rest.style} onClick={rest.onClick} className={css.icon_btn} disabled={rest.disabled}>
                  {tooltip ? (
                     <span style={{ '--top': tooltip.position[0], '--left': tooltip.position[1] } as CSSProperties}>
                        {tooltip.message}
                     </span>
                  ) : null}
               </button>
            </div>
         )
      case 'file-btn':
         return (
            <div className={css.wrapper}>
               <div
                  onClick={() => {
                     if (fileInputRef.current) {
                        fileInputRef.current.click()
                     }
                  }}
                  style={rest.style}
                  className={css.icon_btn}
               >
                  {tooltip ? (
                     <span style={{ '--top': tooltip.position[0], '--left': tooltip.position[1] } as CSSProperties}>
                        {tooltip.message}
                     </span>
                  ) : null}
               </div>
               <input
                  ref={fileInputRef}
                  className={css.file}
                  type='file'
                  onChange={(e) => rest.onChange(e)}
                  accept='.json'
               />
            </div>
         )
      default:
         return
   }
}
