import { useAppSelector } from '@/hooks/redux'
import useUserByID from '@/hooks/useUserByID'
import React, { FC, useState } from 'react'
import css from './Board.module.scss'
import Account from './BoardItems/Account'
import CTOProperty from './BoardItems/CTOProperty/CTOProperty'
import { Director } from './BoardItems/Director'
import Charts from './BoardItems/Director/Charts/Charts'
import Greating from './BoardItems/Greating/Greating'
import HolidayCalendar from './BoardItems/HolidayCalendar/HolidayCalendar'
import QRCodeGenerator from './BoardItems/QRCodeGenerator/QRCodeGenerator'
import Radio from './BoardItems/Radio/Radio'
import RadioNavigate from './BoardItems/Radio/RadioNavigate'
import Time from './BoardItems/Time/Time'
import { useGetUsersQuery } from '@/store/reducers/apiReducer'
import { IUser } from '@/constants/users'
import PDF from './BoardItems/PDF/PDF'

const BoardList: FC<{ isOpen: boolean }> = ({ isOpen }) => {
   const type = useAppSelector((state) => state.reducer.dashboard.dashboardItems)
   const radioData = useAppSelector((state) => state.reducer.radio)
   const { data: user } = useUserByID()
   const [notNullVolume, setNotNullVolume] = useState(1)
   const { data: users, error, isLoading } = useGetUsersQuery()

   const period = new Date().toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/')

   const birthdays = users?.filter(
      (u) =>
         u.describe_date.split('.')[0] === u.describe_date.split('.')[0] && u.describe_date.split('.')[1] === period[1]
   ) as IUser[]

   return (
      <div className={css.wrapper}>
         {type.greating ? <Greating /> : null}
         {type.ctoProperty ? <CTOProperty /> : null}
         {type.account ? <Account user={user} /> : null}
         {type.time ? <Time /> : null}
         {type.qr ? <QRCodeGenerator /> : null}
         {type.radio ? <Radio /> : null}
         {type.employees ? <Director.Employees /> : null}
         {type.timing ? <Director.Timing /> : null}
         {radioData.isRadioNavigate ? <RadioNavigate {...{ isOpen, notNullVolume, setNotNullVolume }} /> : null}
         {type.charts ? <Charts /> : null}
         {type.holidayCalendar ? <HolidayCalendar /> : null}
         {type.pdf ? <PDF /> : null}
      </div>
   )
}

export default BoardList
