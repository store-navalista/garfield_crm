import { useAppSelector } from '@/hooks/redux'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import css from './HolidayCalendar.module.scss'
import useHover from '@/hooks/useHover'
import { DayType } from '../Time/services'
import { IUser } from '@/constants/users'

const translate = {
   en: ['Day:', 'Name:', 'How old are you turning?:'],
   ru: ['День:', 'Имя:', 'Сколько лет исполняется?:']
}

const Day: FC<{ d: DayType; birthday: IUser[]; setDesc: any }> = ({ d, birthday, setDesc }) => {
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const currentYear = new Date().getFullYear()

   const ref = useRef(null)
   const isHover = useHover(ref)

   const style = {
      backgroundColor: d?.day_of ? 'var(--main-blue)' : '#fff',
      color: d?.day_of ? '#fff' : '#000',
      boxShadow: d ? 'var(--shadow-out)' : 'var(--shadow-out), var(--shadow-in)'
   }

   useEffect(() => {
      if (birthday.length) {
         let data = ''
         birthday.forEach((u) => {
            const age = currentYear - Number(u.describe_date.split('.')[2])
            data +=
               translate[i18n][0] +
               ` ${d.formatDay}\n` +
               translate[i18n][1] +
               ` ${u.describe_name}\n` +
               translate[i18n][2] +
               ` ${age} y.o.\n\n`
            setDesc(data)
         })
      } else {
         setDesc('')
      }
   }, [isHover])

   return (
      <div ref={ref} key={d?.day} style={style}>
         {d?.day}
         {birthday.length ? <div className={css.acent} /> : null}
      </div>
   )
}

export default Day
