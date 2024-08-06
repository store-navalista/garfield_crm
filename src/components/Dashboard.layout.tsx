import { useAppSelector } from '@/hooks/redux'
import React, { FC, ReactNode, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryComponent } from './Error/Error'
import css from './Dashboard.layout.module.scss'
import Seo from './seo'
import useUserByID from '@/hooks/useUserByID'

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
   const isLaptop = useAppSelector((state) => state.reducer.content.mediaQuery.isLaptop)
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const id = useAppSelector((state) => state.reducer.content._id)
   const [scrollStep, setcrollStep] = useState(0)
   const data = useUserByID()

   return (
      <ErrorBoundary fallbackRender={ErrorBoundaryComponent}>
         <Seo siteTitle='Dashboard' pageTitle={data?.data?.describe_name} description='All in one!' />
         <main className={css.wrapper}>{children}</main>
      </ErrorBoundary>
   )
}

export default DashboardLayout
