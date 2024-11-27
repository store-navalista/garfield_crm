import React, { DetailedHTMLProps, FC, InputHTMLAttributes, memo } from 'react'
import css from './Table.module.scss'

type InputProps = Partial<{
   value: string | number
}> &
   DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const StaticInput: FC<InputProps> = ({ value }) => {
   return (
      <div className={css.input}>
         <input value={value} readOnly />
      </div>
   )
}

export default memo(StaticInput, (prevProps, nextProps) => {
   return prevProps?.value === nextProps?.value
})
