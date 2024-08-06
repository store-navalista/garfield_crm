import { week_days } from '@/constants/dashboard'
import { IUser } from '@/constants/users'
import { useAppSelector } from '@/hooks/redux'
import translate from '@/i18n/translate'
import { useGetUsersQuery } from '@/store/reducers/apiReducer'
import React, { FC, Fragment, useMemo, useState } from 'react'
import TimeService from '../Time/services'
import Day from './Day'
import css from './HolidayCalendar.module.scss'
import { NOT_SELECTED } from '@/constants/employees'

const HolidayCalendar: FC = () => {
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const timeService = new TimeService(i18n)
   const [currentDate, setCurrentDate] = useState(new Date())
   const days = timeService.getDaysOfMonth(currentDate)
   const week_days_i18n = useMemo(() => week_days[i18n], [i18n])
   const currentMonthNumber = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
   const { data: users, isLoading, isError } = useGetUsersQuery()
   const [desc, setDesc] = useState('')

   const formatted_days = useMemo(() => {
      const new_arr = [...days]
      const count = days[0]?.week_order === 0 ? 6 : days[0]?.week_order - 1
      for (let i = 0; i < count; i++) {
         new_arr.unshift(null)
      }
      return new_arr
   }, [currentDate])

   if (isLoading || isError) return <></>

   const changeMonth = (func: 'getPreviousMonth' | 'getNextMonth') => {
      setCurrentDate((prevDate) => timeService[func](prevDate))
   }

   const users_all = [...users, ...NOT_SELECTED]

   const filteredUsersByMonth = users_all?.filter((u) => u.describe_date.split('.')[1] === currentMonthNumber)

   return (
      <div className={css.wrapper}>
         <h2>{translate('dashboard.nav-holidayCalendar')}</h2>
         <div className={css.buttons}>
            <div>
               <button onClick={() => changeMonth('getPreviousMonth')}>-</button>
               <p>{timeService.formatDateToMonthYear(currentDate).replace(/(\d+).*/g, '$1')}</p>
               <button onClick={() => changeMonth('getNextMonth')}>+</button>
            </div>
         </div>
         <div className={css.header}>
            {week_days_i18n.map((d) => {
               return <span key={d}>{d.at(0)}</span>
            })}
         </div>
         <div className={css.days_wrapper}>
            {formatted_days.map((d) => {
               const birthday = filteredUsersByMonth.filter((u) => {
                  const day = u.describe_date.split('.')[0]
                  const cutZeroDay = day[0] === '0' ? day.slice(1) : day

                  return cutZeroDay === d?.day?.toString()
               }) as IUser[]

               return (
                  <Fragment key={d?.day}>
                     <Day {...{ d, birthday, setDesc }} />
                  </Fragment>
               )
            })}
         </div>
         {desc ? <textarea className={css.desc} value={desc} readOnly /> : null}
      </div>
   )
}

export default HolidayCalendar
