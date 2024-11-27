import React, { FC, memo } from 'react'
import { ChangeValuesProps } from '../Vessels'
import css from '../Vessels.module.scss'

const VesselValues: FC<ChangeValuesProps> = ({ index, type, value, imo_frozen, handleChangeValues }) => {
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      if (type === 'IMO') {
         if (/^\d*\.?\d*$/.test(inputValue)) {
            handleChangeValues({ index, type, value: Number(inputValue) })
         }
         return
      }
      handleChangeValues({ index, type, value: inputValue })
   }

   const handleIMOFreeze = () => {
      handleChangeValues({ index, type: 'imo_frozen', value: !imo_frozen })
   }

   return (
      <>
         <input
            onChange={handleInputChange}
            data-type={type}
            key={type + index}
            className={css.input}
            value={value as string}
            disabled={type === 'ID' || (imo_frozen && type === 'IMO')}
         />
         {type === 'IMO' && (
            <div className={css.frozen}>
               <button onClick={handleIMOFreeze} style={{ opacity: imo_frozen ? 0 : 1 }} />
               <div style={{ opacity: imo_frozen ? 1 : 0 }} />
            </div>
         )}
      </>
   )
}

export default memo(VesselValues, (prevProps, nextProps) => {
   return prevProps.value === nextProps.value && prevProps.imo_frozen === nextProps.imo_frozen
})
