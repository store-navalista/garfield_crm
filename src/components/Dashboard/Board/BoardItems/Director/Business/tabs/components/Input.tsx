import React, { FC } from 'react'

type InputProps = {
   value: number | string
   setValue: (value: number | string) => void
   disabled?: boolean
   property: string
}

const Input: FC<InputProps> = ({ value, setValue, disabled, property }) => {
   const setTypedValue = (inputValue: string) => {
      if (property === 'IMO') {
         if (/^\d*$/.test(inputValue)) {
            setValue(Number(inputValue))
         }
      } else {
         setValue(inputValue)
      }
   }

   return <input type='text' value={value} onChange={(e) => setTypedValue(e.target.value)} disabled={disabled} />
}

export default Input
