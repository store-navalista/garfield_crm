import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import css from './Input.module.scss'

type TInput = { type: 's' | 'l' } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: FC<TInput> = ({ type, ...rest }) => {
   return (
      <input
         style={rest.style}
         className={`${css.input} ${rest.className}`}
         data-type={type}
         placeholder={rest.placeholder}
         value={rest.value}
         onChange={rest.onChange}
         disabled={rest.disabled}
      />
   )
}
