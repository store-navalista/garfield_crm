import { useAppSelector } from '@/hooks/redux'
import React, { FC, useEffect, useRef } from 'react'
import TimeService from '../../../Time/services'
import css from '../Employees.module.scss'

export type LogType = {
   message?: string
}

const Logs: FC<LogType> = ({ message = '' }) => {
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const logger = useRef<HTMLTextAreaElement>(null)
   const date = new TimeService(i18n).formatDateToMonthYear(new Date())

   const timeFormat = () => {
      const currentDate = new Date()
      const hours = String(currentDate.getHours()).padStart(2, '0')
      const minutes = String(currentDate.getMinutes()).padStart(2, '0')
      const seconds = String(currentDate.getSeconds()).padStart(2, '0')
      return `${hours}.${minutes}.${seconds}`
   }

   useEffect(() => {
      const newTime = timeFormat()

      if (logger.current && message) {
         logger.current.value += `\n${newTime} -> ${message}`
         logger.current.scrollTop = logger.current.scrollHeight
      }
   }, [message])

   return (
      <div className={css.logs}>
         <textarea ref={logger} defaultValue={`Active: ${date} ${timeFormat()}`} readOnly />
      </div>
   )
}

export default Logs
