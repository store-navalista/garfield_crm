import React, { FC } from 'react'
import { HeaderProps } from '../Timing'
import css from '../Timing.module.scss'
import translate from '@/i18n/translate'

const Header: FC<HeaderProps> = ({ timeService, currentDate, setCurrentDate, days, openedJobs, setOpenedJobs }) => {
   const collapse = () => {
      setOpenedJobs(
         openedJobs.map((j) => {
            return { id: j.id, isOpen: false }
         })
      )
   }

   const previousMonth = () => {
      collapse()
      setCurrentDate((prevDate) => timeService.getPreviousMonth(prevDate))
   }

   const nextMonth = () => {
      collapse()
      setCurrentDate((prevDate) => timeService.getNextMonth(prevDate))
   }

   function getCurrentMonth(): string {
      return timeService.formatDateToMonthYear(currentDate)
   }

   const cells = ['person', 'project_number', 'ship_name', 'job_description']

   return (
      <div className={`${css.row} ${css.header}`}>
         {cells.map((c) => (
            <p key={c}>{translate(`dashboard.timereport-job-${c}`)}</p>
         ))}
         <div className={css.days}>
            <div className={css.nav}>
               <button onClick={previousMonth} />
               <p>{getCurrentMonth().replace(/(\d+).*/g, '$1')}</p>
               <button onClick={nextMonth} />
            </div>
            {days.map((d) => {
               const { day, day_of } = d
               return (
                  <span
                     key={day}
                     style={{
                        backgroundColor: day_of ? 'var(--second-blue)' : '#fff',
                        color: day_of ? ' #fff' : '#000'
                     }}
                  >
                     {day}
                  </span>
               )
            })}
         </div>
         <p>{translate('dashboard.timereport-job-total')}</p>
      </div>
   )
}

export default Header
