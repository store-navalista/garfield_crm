import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, useCallback, useEffect, useState } from 'react'
import css from './Table.module.scss'
import { COLORS, DESIGN_WORK_PROPS, FieldOptionsType } from '@/constants/works'
import { useGetBusinessWorksNumbersQuery } from '@/store/reducers/businessApiReducer'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { BusinessActions } from '@/store/reducers/businessReducer'

type InputProps = Partial<{
   id: string
   wt: keyof DESIGN_WORK_PROPS
   value: string | number
   onChangeHandle: React.Dispatch<React.SetStateAction<Partial<DESIGN_WORK_PROPS>>>
   options: FieldOptionsType
}> &
   DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<InputProps> = ({ id, wt, value, onChangeHandle, options = {}, readOnly = false }) => {
   const [inputValue, setInputValue] = useState(value)
   const dispatch = useAppDispatch()
   const { data: works_numbers } = useGetBusinessWorksNumbersQuery({ type: 'design' })
   const colors = COLORS

   useEffect(() => {
      setInputValue(value)
   }, [value])

   const regex = (() => {
      const type = options?.type ? options.type : 'text'

      switch (type) {
         case 'number':
            return /^[0-9]*$/
         case 'dot_number':
            return /^[0-9]*\.?[0-9]*$/
         default:
            return null
      }
   })()

   const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         const newValue = event.target.value

         if (!regex || regex.test(newValue)) {
            setInputValue(newValue)
         }
      },
      [regex]
   )

   useEffect(() => {
      if (onChangeHandle) {
         const types_value =
            options?.type === 'number' || options?.type === 'dot_number' ? Number(inputValue) : inputValue
         onChangeHandle((prevState) => ({ ...prevState, [wt]: types_value }))
      }

      if (wt === 'work_number' && works_numbers?.includes(Number(inputValue))) {
         dispatch(BusinessActions.setError('001'))
      } else {
         dispatch(BusinessActions.setError(''))
      }
   }, [inputValue])

   return (
      <div className={css.input}>
         <input value={inputValue} onChange={handleChange} readOnly={readOnly} placeholder='-' />
         {/* <div className={css.colors}>
            <div>
               {colors.map((c) => (
                  <button
                     onClick={changeColors}
                     style={{ backgroundColor: c[0], ...rest.style } as CSSProperties}
                     key={c[0]}
                  />
               ))}
            </div>
         </div> */}
      </div>
   )
}

export default Input
