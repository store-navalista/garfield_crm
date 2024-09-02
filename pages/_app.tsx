import DashboardLayout from '@/components/Dashboard.layout'
import NotDesktop from '@/components/NotDesktop/NotDesktop'
import { I18nProvider } from '@/i18n'
import store from '@/store/store'
import { AppProps } from 'next/app'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import '../styles/main.scss'
import './styles/index.css'

type IAppWrapperProps = Pick<AppProps, 'Component' | 'pageProps'>

function DashboardWrapper({ Component, pageProps }: IAppWrapperProps) {
   return (
      <DashboardLayout>
         <Component {...pageProps} />
      </DashboardLayout>
   )
}

const MyApp = ({ Component, pageProps }: IAppWrapperProps) => {
   return (
      <Provider store={store}>
         <CookiesProvider>
            <I18nProvider>
               <DashboardWrapper Component={Component} pageProps={pageProps} />
            </I18nProvider>
         </CookiesProvider>
      </Provider>
   )
}

export default MyApp
