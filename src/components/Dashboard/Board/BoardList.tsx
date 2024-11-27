import { useAppSelector } from '@/hooks/redux'
import useUserByID from '@/hooks/useUserByID'
import React, { FC, useEffect, useMemo, useState } from 'react'
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
import Video from './BoardItems/Video/Video'
import { useMediaQuery } from 'react-responsive'
import NotDesktop from '@/components/NotDesktop/NotDesktop'
import Business from './BoardItems/Director/Business/Business'

export interface BoardTabProps {
   isMobileVersion: boolean
}

const BoardList: FC<{ isOpen: boolean }> = ({ isOpen }) => {
   const type = useAppSelector((state) => state.reducer.dashboard.dashboardItems)
   const radioData = useAppSelector((state) => state.reducer.radio)
   const { data: user } = useUserByID()
   const [notNullVolume, setNotNullVolume] = useState(1)
   const { data: users, error, isLoading } = useGetUsersQuery()
   const W800 = useMediaQuery({ query: '(max-width: 800px)' })

   const period = new Date().toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/')

   const birthdays = users?.filter(
      (u) =>
         u.describe_date.split('.')[0] === u.describe_date.split('.')[0] && u.describe_date.split('.')[1] === period[1]
   ) as IUser[]

   return (
      <div className={css.wrapper}>
         {type.greating ? <Greating /> : null}
         {type.ctoProperty ? !W800 ? <CTOProperty /> : <NotDesktop /> : null}
         {type.account ? !W800 ? <Account user={user} /> : <NotDesktop /> : null}
         {type.time ? !W800 ? <Time /> : <NotDesktop /> : null}
         {type.qr ? !W800 ? <QRCodeGenerator /> : <NotDesktop /> : null}
         {type.radio ? <Radio /> : null}
         {type.employees ? !W800 ? <Director.Employees /> : <NotDesktop /> : null}
         {type.timing ? !W800 ? <Director.Timing /> : <NotDesktop /> : null}
         {radioData.isRadioNavigate ? <RadioNavigate {...{ isOpen, notNullVolume, setNotNullVolume }} /> : null}
         {type.charts ? !W800 ? <Charts /> : <NotDesktop /> : null}
         {type.holidayCalendar ? !W800 ? <HolidayCalendar /> : <NotDesktop /> : null}
         {type.pdf ? !W800 ? <PDF /> : <NotDesktop /> : null}
         {type.video ? <Video /> : null}
         {type.business ? <Business /> : null}
      </div>
   )
}

export default BoardList
