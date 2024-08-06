import { useGetUserQuery } from '@/store/reducers/apiReducer'
import { ILayoutComponentProps } from '@/types/layout'
import React, { FC, useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import css from './Header.module.scss'
import Cabinet from './components/Cabinet/Cabinet'
import Logout from './components/Cabinet/Logout'
import Clock from './components/Clock/Clock'
import Logo from './components/Logo/Logo'
import MenuMobile from './components/MenuMobile/MenuMobile'
import ProgressBar from './components/ProgressBar/ProgressBar'
import QuickPanel from './components/QuickPanel/QuickPanel'

const Header: FC<ILayoutComponentProps> = () => {
   const [cookies, , removeCookie] = useCookies(['token', 'user_id'])
   const [isSignin, setisSignin] = useState(false)
   const { data: user, error } = useGetUserQuery({ userId: new Cookies().get('user_id') })

   useEffect(() => {
      cookies['token'] && cookies['user_id'] ? setisSignin(true) : setisSignin(false)
   }, [cookies, user])

   useEffect(() => {
      if (error) {
         removeCookie('token')
         removeCookie('user_id')
      }
   }, [error])

   return (
      <header className={css.wrapper}>
         <div className={css.leftBlock}>
            <MenuMobile />
            {/* <Logo type='decor' /> */}
            <Clock />
            <div className={css.auth}>
               <Cabinet />
               {isSignin ? <Logout removeCookie={removeCookie} /> : null}
            </div>
         </div>
         <Logo />
         <div className={css.rightBlock}>
            <ProgressBar />
            <QuickPanel />
         </div>
         <span className={css.blur} />
      </header>
   )
}

export default Header
