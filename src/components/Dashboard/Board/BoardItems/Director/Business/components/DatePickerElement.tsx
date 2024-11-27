import React, { FC, memo, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import css from '../tabs/Tabs.module.scss'
import { WorksStateType } from './Row'

const DatePickerElement: FC<WorksStateType & { wt: string }> = ({ wt, localWorks, setLocalWorks }) => {
   const [currentDate, setCurrentDate] = useState(localWorks[wt] ? localWorks[wt] : new Date())

   useEffect(() => {
      setLocalWorks((prevState) => ({ ...prevState, [wt]: currentDate }))
   }, [currentDate])

   return (
      <div className={css.input_wrapper}>
         <DatePicker
            className={css.input}
            dateFormat='dd/MM/yyyy'
            selected={currentDate}
            onSelect={(date) => setCurrentDate(date)}
         />
      </div>
   )
}

export default memo(DatePickerElement)
