import Portal from '@/HOC/Portal'
import Tooltip from '@/components/UI/tooltip/Tooltip'
import useHover from '@/hooks/useHover'
import useOutsideClick from '@/hooks/useOutsideClick'
import useOverflow from '@/hooks/useOverflow'
import translate from '@/i18n/translate'
import { useGetUserQuery, useLoginMutation } from '@/store/reducers/apiReducer'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useCookies, Cookies } from 'react-cookie'
import css from './Cabinet.module.scss'

const Cabinet: FC = () => {
   const [login, { data, isLoading, error, isError, isSuccess }] = useLoginMutation()
   const [isOpen, setisOpen] = useState(false)
   const [loginData, setLoginData] = useState({ username: '', password: '' })
   const [i18n_error, setI18n_error] = useState('')
   const wrapperRef = useRef(null)
   const keysRef = useRef(null)
   const hoverRef = useRef(null)
   const isHovering = useHover(hoverRef)
   const router = useRouter()
   const [cookies, setCookies] = useCookies(['token', 'user_id', 'saved_username', 'saved_password'])
   const { data: user } = useGetUserQuery({ userId: new Cookies().get('user_id') })
   const [isHidden, setisHidden] = useState(true)
   const [isChecked, setIsChecked] = useState(false)

   const handlePressKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
         logIn()
      }
   }
   useEffect(() => {
      if (keysRef.current) {
         keysRef.current.addEventListener('keydown', handlePressKey)

         return () => {
            if (keysRef.current) {
               keysRef.current.removeEventListener('keydown', handlePressKey)
            }
         }
      }
   }, [isOpen, handlePressKey])

   function exit() {
      if (!cookies['saved_username'] && !cookies['saved_password']) {
         setLoginData({ username: '', password: '' })
         setIsChecked(false)
      }
      setI18n_error('')
      if (!isLoading) setisOpen(false)
   }

   useOutsideClick(wrapperRef, exit)

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

   const routeCabinet = () => {
      if (user) {
         router.push({
            pathname: '/dashboard',
            query: { id: user.id }
         })
      }
   }

   useEffect(() => {
      if (isSuccess && user) {
         setisOpen(false)
         router.push({
            pathname: '/dashboard',
            query: { id: user.id }
         })
      }
   }, [isSuccess, user])

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

   useEffect(() => {
      if (data) {
         setCookies('token', data.token)
         setCookies('user_id', data.id)
      }
      if (isChecked) {
         setCookies('saved_username', loginData.username, { path: '/', maxAge: 3600 * 24 * 30 }) // 30 days
         setCookies('saved_password', loginData.password, { path: '/', maxAge: 3600 * 24 * 30 }) // 30 days
      } else {
         setCookies('saved_username', '', { path: '/', expires: new Date(0) })
         setCookies('saved_password', '', { path: '/', expires: new Date(0) })
      }
   }, [data, isChecked])

   useEffect(() => {
      const savedUsername = cookies['saved_username']
      const savedPassword = cookies['saved_password']
      if (savedUsername && savedPassword) {
         setLoginData({ username: savedUsername, password: savedPassword })
         setIsChecked(true)
      }
   }, [])

   const enterCabinet = () => {
      if (cookies['token'] && cookies['user_id']) {
         return routeCabinet()
      }

      setisOpen(!isOpen)
   }

   useOverflow(isOpen)

   return (
      <>
         <button ref={hoverRef} onClick={enterCabinet} className={css.button}>
            <Tooltip content='cabinet' isShow={isHovering && !isOpen} />
         </button>

         <Portal selector='#portal'>
            <AnimatePresence mode='wait'>
               {isOpen && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                  >
                     <div ref={keysRef} className={css.wrapper}>
                        <div ref={wrapperRef} className={css.block}>
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
                           <button disabled={isLoading} className={css.close} onClick={exit}>
                              &#215;
                           </button>
                           <div className={css.checkbox}>
                              <input
                                 id='save_me'
                                 type='checkbox'
                                 checked={isChecked}
                                 onChange={() => setIsChecked(!isChecked)}
                              />
                              <label htmlFor='save_me'>{translate('tooltip.header-save-me')}</label>
                           </div>
                           {i18n_error ? <p className={css.message}>{translate(i18n_error)}</p> : null}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </Portal>
      </>
   )
}

export default Cabinet
