import React, { FC, useMemo } from 'react'
import { PersonProps } from '../Timing'
import css from '../Timing.module.scss'
import { Checkbox } from '@mui/material'

const sx = {
   '&.MuiCheckbox-colorPrimary': {
      color: 'var(--main-blue)'
   },
   '.MuiSvgIcon-fontSizeSmall': {
      width: '16px',
      height: '16px'
   }
}

const Person: FC<PersonProps> = ({
   user,
   days,
   isReportExist,
   filteredJobs,
   setOpenedJobs,
   openedJobs,
   setFilter,
   filter
}) => {
   const { id, describe_name } = user
   const summedHours = filteredJobs.reduce((accumulator, currentValue) => {
      currentValue.hours_worked.forEach((value, index) => {
         if (value > 0) {
            if (accumulator[index] === undefined) {
               accumulator[index] = value
            } else {
               accumulator[index] += value
            }
         }
      })
      return accumulator
   }, [])

   const expandHandler = () => {
      setOpenedJobs(
         openedJobs.map((j) => {
            if (j.id === id) {
               return { ...j, isOpen: !j.isOpen }
            }
            return j
         })
      )
   }

   const sum = summedHours.reduce((acc, current) => (current > 0 ? acc + current : acc), 0)
   const isChecked = useMemo(() => filter.find((obj) => Object.hasOwn(obj, describe_name)), [filter])

   const check = () => {
      const newFilter = filter.some((obj) => Object.hasOwn(obj, describe_name))
         ? filter.map((obj) => (Object.hasOwn(obj, describe_name) ? { [describe_name]: !obj[describe_name] } : obj))
         : [...filter, { [describe_name]: true }]

      setFilter(newFilter)
   }

   return (
      <div className={css.row}>
         <Checkbox
            checked={isChecked?.[describe_name]}
            onChange={check}
            className={css.checkbox}
            sx={sx}
            size='small'
            defaultChecked
         />
         <p style={{ paddingLeft: isReportExist && filteredJobs.length ? '22px' : '5px' }}>
            {describe_name}
            {isReportExist && filteredJobs.length ? (
               <button
                  onClick={expandHandler}
                  style={{
                     backgroundImage: `url(/assets/images/svg/custom-button-icon-${
                        openedJobs.find((j) => j.id === id)?.isOpen ? 'minus' : 'plus'
                     }.svg)`
                  }}
                  className={css.expand}
               />
            ) : null}
         </p>
         <p></p>
         <p></p>
         <p></p>
         <div className={css.days}>
            {days.map((d, i) => {
               const { day } = d
               return (
                  <span data-type='sum' key={day}>
                     {summedHours[i]}
                  </span>
               )
            })}
         </div>
         <p style={{ backgroundColor: '#97d9f31f', borderRight: '2px solid var(--main-blue' }}>{sum}</p>
      </div>
   )
}

export default Person
