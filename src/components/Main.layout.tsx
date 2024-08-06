import { useAppSelector } from '@/hooks/redux'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryComponent } from './Error/Error'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import st from './Main.layout.module.scss'
import Seo from './seo'
import { PagesData as SEO } from '@/i18n/pages/locales'
import { Map } from './Pages/map/Map'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import useUserByID from '@/hooks/useUserByID'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
   const isLaptop = useAppSelector((state) => state.reducer.content.mediaQuery.isLaptop)
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const id = useAppSelector((state) => state.reducer.content._id)
   const [scrollStep, setcrollStep] = useState(0)

   const scroll = () => {
      setcrollStep(window.pageYOffset)
   }

   useEffect(() => {
      window.addEventListener('scroll', scroll)
   })

   let pages = {}

   for (const key in SEO[i18n]) {
      if (typeof SEO[i18n][key] === 'object') {
         pages = { ...pages, ...SEO[i18n][key] }
      }
   }

   return (
      <ErrorBoundary fallbackRender={ErrorBoundaryComponent}>
         <Seo {...pages[id].seo} />
         <main className={st.wrapper}>
            <Header scrollStep={scrollStep} />
            {children}
            <Map />
            <Footer scrollStep={scrollStep} isLaptop={isLaptop} />
         </main>
      </ErrorBoundary>
   )
}

export default MainLayout
