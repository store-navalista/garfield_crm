import { IJob } from '@/constants/jobs'
import _ from 'lodash'
import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import TimeService from '../services'
import css from './TimeHeader.module.scss'

interface ITimeHeader {
   timeService: TimeService
   currentDate: Date
   setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
   days: ReturnType<TimeService['getDaysOfMonth']>
   updateJobs: any
   findCommonTasks(): void
   jobs: IJob[]
   snapshot: IJob[]
   sortedData: IJob[]
}

const getStyle = (day_of: boolean) => {
   const style = {
      '--day-of': day_of ? '#29abe2' : '#fff',
      '--text-color': day_of ? '#fff' : '#000'
   }

   return style
}

const TimeHeader: FC<ITimeHeader> = ({
   timeService,
   currentDate,
   setCurrentDate,
   days,
   updateJobs,
   findCommonTasks,
   jobs,
   snapshot
}) => {
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })
   const [isSaved, setisSaved] = useState(true)
   const message = staticTranslate('dashboard.timereport-job-warning-unsafe')

   const changeMonth = (func: 'getPreviousMonth' | 'getNextMonth') => {
      if (!isSaved) {
         const apply = confirm(message)
         if (!apply) return
      }

      updateJobs({ type: 'reset', payload: '' })
      setCurrentDate((prevDate) => timeService[func](prevDate))
      findCommonTasks()
   }

   function getCurrentMonth(): string {
      return timeService.formatDateToMonthYear(currentDate)
   }

   function is_empty_report() {
      if (jobs?.length === 1) {
         const is_empty_days = _.isEqual(
            days.map((d) => (d.day_of ? -0.5 : 0)),
            jobs[0].hours_worked
         )

         const is_description = ['job_description', 'project_number', 'ship_name'].map((key) => jobs[0][key]).join('')
         if (is_empty_days && !is_description) return true
      }
      return false
   }

   useEffect(() => {
      if (is_empty_report()) {
         setisSaved(true)
         return
      }

      const updateJobsWithoutId = jobs.map((job) => {
         const { id, ...rest } = job
         return rest
      })

      if (!_.isEqual(updateJobsWithoutId, snapshot)) {
         setisSaved(false)
      }
   }, [jobs, currentDate])

   return (
      <div className={css.wrapper}>
         <div className={css.date}>
            <button onClick={() => changeMonth('getPreviousMonth')} aria-label='Previous Month'>
               &#9664;
            </button>
            <span>{getCurrentMonth().replace(/(\d+).*/g, '$1')}</span>
            <button onClick={() => changeMonth('getNextMonth')} aria-label='Next Month'>
               &#9654;
            </button>
            {/* <span className={css.warning_trigger} /> */}
            {/* <p className={css.warning}>{translate('dashboard.timereport-job-warning-unsafe')}</p> */}
         </div>
         <ul className={css.calendar}>
            {days.map((d, i) => {
               const { day, formatDay, day_of } = d
               return (
                  <li style={getStyle(day_of) as CSSProperties} key={i}>
                     {day}
                     <span className={css.tooltip}>{formatDay}</span>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default TimeHeader
