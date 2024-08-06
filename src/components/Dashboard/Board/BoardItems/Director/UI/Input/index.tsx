import React, { FC, useState } from 'react'
import css from './index.module.scss'
import Image from 'next/image'

type InputProps = Partial<{
   icon: string
   label: string
   locked: boolean
   isPassword: boolean
   iconWidth: [number, number]
   isInvalid: boolean
}> &
   React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<InputProps> = ({ icon, label, locked, isPassword, isInvalid, iconWidth = [8, 8], ...rest }) => {
   const [isHidden, setisHidden] = useState(true)

   return (
      <div className={css.field}>
         <div data-type={rest['data-type']} className={css.input + `${isInvalid ? ' ' + css.input_invalid : ''}`}>
            <label data-label={label ? 'labeled' : ''}>
               {label ? (
                  label
               ) : (
                  <Image src={`/assets/images/svg/${icon}`} width={iconWidth[0]} height={iconWidth[1]} alt='icon' />
               )}
            </label>
            <input type={isPassword && isHidden ? 'password' : 'text'} {...rest} />
            {locked ? <span /> : null}
            {isPassword ? (
               <button
                  onClick={() => setisHidden(!isHidden)}
                  style={{ backgroundImage: `url(/assets/images/svg/user-password-${isHidden ? 'hide' : 'show'}.svg)` }}
                  className={css.show}
               />
            ) : null}
         </div>
      </div>
   )
}

export default Input
