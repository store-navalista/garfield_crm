import translate from '@/i18n/translate'
import { useCheckAuthQuery, useLoginMutation } from '@/store/reducers/apiReducer'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react'
import css from './Auth.module.scss'
import { decodeToken } from './services'

const Auth: FC = () => {
   const [login, { data, isLoading, error, isError, isSuccess }] = useLoginMutation()
   const [loginData, setLoginData] = useState({ username: '', password: '' })
   const [i18n_error, setI18n_error] = useState('')
   const wrapperRef = useRef(null)
   const keysRef = useRef(null)
   const router = useRouter()
   const [isHidden, setisHidden] = useState(true)
   const { data: existID } = useCheckAuthQuery()
   const [userID, setUserID] = useState('')

   const handlePressKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
         logIn()
      }
   }

   useEffect(() => {
      if (data && isSuccess) {
         setUserID(decodeToken(data.login.access_token).id)
      }
   }, [data])

   useEffect(() => {
      if (keysRef.current) {
         keysRef.current.addEventListener('keydown', handlePressKey)

         return () => {
            if (keysRef.current) {
               keysRef.current.removeEventListener('keydown', handlePressKey)
            }
         }
      }
   }, [handlePressKey])

   const isCustomError = () => {
      const { username, password } = loginData
      if (!username || username.length < 5) {
         setI18n_error('custom.login-errors-empty_username')
         return true
      }
      if (!password || password.length < 5) {
         setI18n_error('custom.login-errors-empty_password')
         return true
      }
      setI18n_error('')
      return false
   }

   const logIn = async () => {
      const invalidate = isCustomError()
      if (!invalidate) await login(loginData)
   }

   useEffect(() => {
      if (userID || existID) {
         router.push({
            pathname: '/dashboard',
            query: { id: userID }
         })
      }
   }, [userID])

   useEffect(() => {
      if (existID) {
         router.push({
            pathname: '/dashboard',
            query: { id: existID }
         })
      }
   }, [existID])

   useEffect(() => {
      if (isError) {
         const i18nMessage = (error as { message: string })?.message.split(':')[0].toLowerCase().replace(/ /g, '_')
         const variants = ['no_such_employee_exists', 'incorrect_password']
         if (i18nMessage === 'network_request_failed') return setI18n_error('network_request_failed')
         variants.includes(i18nMessage)
            ? setI18n_error(`custom.login-errors-${i18nMessage}`)
            : setI18n_error('unexpected_error')
      } else {
         setI18n_error('')
      }
   }, [error])

   return (
      <AnimatePresence mode='wait'>
         <motion.div>
            <div ref={keysRef} className={css.wrapper}>
               <div className={css.bottom_bg} />
               <div ref={wrapperRef} className={css.block}>
                  <div className={css.content}>
                     <div className={css.logo} />
                     <h3>{translate('auth-title')}</h3>
                     <div className={css.username}>
                        <h4>{translate('auth-username')}</h4>
                        <div>
                           <input
                              type='text'
                              placeholder='Ivan Ivanov'
                              value={loginData.username}
                              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className={css.password}>
                        <h4>{translate('auth-password')}</h4>
                        <div>
                           <input
                              type={isHidden ? 'password' : 'text'}
                              placeholder='password123'
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                           />
                           <button
                              className={css.see}
                              onClick={() => setisHidden(!isHidden)}
                              style={{
                                 backgroundImage: `url(/assets/images/svg/user-password-${
                                    isHidden ? 'hide' : 'show'
                                 }.svg)`
                              }}
                           />
                        </div>
                     </div>
                     <button disabled={isLoading} className={css.login} onClick={logIn}>
                        {!isLoading ? translate('auth-login') : null}
                        <Image
                           style={{ filter: 'invert(1)', display: isLoading ? 'block' : 'none' }}
                           src='/assets/images/svg/request-loader.svg'
                           width={14}
                           height={14}
                           alt='loader'
                        />
                     </button>
                     {i18n_error ? <p className={css.message}>{translate(i18n_error)}</p> : null}
                  </div>
               </div>
            </div>
         </motion.div>
      </AnimatePresence>
   )
}

export default Auth
