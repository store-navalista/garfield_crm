import React, { Fragment, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { IntlProvider } from 'react-intl'
import { useAppSelector } from '../hooks/redux'
import { LOCALES } from './locales'
import messages from './messages'

interface IProvider {
   children: JSX.Element
   locale?: string
}

const Provider = ({ children, locale }: IProvider) => {
   const language = useAppSelector((state) => state.reducer.content.currentLang)
   const cookies = new Cookies().get('language')
   locale = LOCALES[language] || LOCALES.ENGLISH
   useEffect(() => {
      if (cookies) locale = LOCALES[cookies]
   }, [])
   return (
      <IntlProvider locale={locale || navigator.language} textComponent={Fragment} messages={messages[locale]}>
         {children}
      </IntlProvider>
   )
}

export default Provider
