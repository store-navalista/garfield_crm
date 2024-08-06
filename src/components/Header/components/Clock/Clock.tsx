import React, { FC, useEffect, useState } from 'react'
import css from './Clock.module.scss'
import { useAppSelector } from '@/hooks/redux'

const Clock: FC = () => {
   const [time, setTime] = useState(new Date())
   const isMobile = useAppSelector((state) => state.reducer.content.mediaQuery.isMobile)

   useEffect(() => {
      const interval = setInterval(() => {
         setTime(new Date())
      }, 1000)

      return () => clearInterval(interval)
   }, [])

   const formatTime = (number: number) => String(number).padStart(2, '0')

   return !isMobile ? (
      <div className={css.clock}>
         <span>{formatTime(time.getHours())}</span>
         <span>:</span>
         <span>{formatTime(time.getMinutes())}</span>
      </div>
   ) : null
}

export default Clock
