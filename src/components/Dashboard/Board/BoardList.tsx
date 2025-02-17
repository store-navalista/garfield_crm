import { decodeToken } from '@/components/Auth/services'
import NotDesktop from '@/components/NotDesktop/NotDesktop'
import Loader from '@/components/UI/loader/Loader'
import { useAppSelector } from '@/hooks/redux'
import useUserByID from '@/hooks/useUserByID'
import { useRefreshMutation } from '@/store/reducers/apiReducer'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import css from './Board.module.scss'
import Account from './BoardItems/Account'
import CTOProperty from './BoardItems/CTOProperty/CTOProperty'
import { Director } from './BoardItems/Director'
import Business from './BoardItems/Director/Business/Business'
import Charts from './BoardItems/Director/Charts/Charts'
import Greating from './BoardItems/Greating/Greating'
import HolidayCalendar from './BoardItems/HolidayCalendar/HolidayCalendar'
import PDF from './BoardItems/PDF/PDF'
import QRCodeGenerator from './BoardItems/QRCodeGenerator/QRCodeGenerator'
import Radio from './BoardItems/Radio/Radio'
import RadioNavigate from './BoardItems/Radio/RadioNavigate'
import Time from './BoardItems/Time/Time'
import Video from './BoardItems/Video/Video'

export interface BoardTabProps {
   isMobileVersion: boolean
}

const BoardList: FC<{ isOpen: boolean }> = ({ isOpen }) => {
   const type = useAppSelector((state) => state.reducer.dashboard.dashboardItems)
   const radioData = useAppSelector((state) => state.reducer.radio)
   const { data: user } = useUserByID()
   const [notNullVolume, setNotNullVolume] = useState(1)
   const W800 = useMediaQuery({ query: '(max-width: 800px)' })

   const router = useRouter()
   const [accessToken, setAccessToken] = useState<string | null>(null)
   const [refresh] = useRefreshMutation()

   const refreshToken = async () => {
      try {
         const refreshResponse = await refresh().unwrap()
         return refreshResponse?.refresh?.access_token || null
      } catch (error) {
         console.error('Token renew error', error)
         return null
      }
   }

   useEffect(() => {
      const checkToken = async () => {
         let token = accessToken
         if (!token) {
            token = await refreshToken()
         }

         if (!token) {
            router.replace('/')
            return
         }

         try {
            const decoded: any = decodeToken(token)
            if (!decoded || !decoded.exp || decoded.exp < Date.now() / 1000) {
               token = await refreshToken()
            }

            if (!token) {
               router.replace('/')
               return
            }

            setAccessToken(token)
         } catch (error) {
            console.error(error)
            router.replace('/')
         }
      }

      checkToken()
   }, [router])

   if (!accessToken || !user) return <Loader />

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
