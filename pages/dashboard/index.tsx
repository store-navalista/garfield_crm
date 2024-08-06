import { DashboardTemplate } from '@/components/Dashboard'
import Loader from '@/components/UI/loader/Loader'
import useLoading from '@/hooks/useLoading'
import { useGetUserQuery } from '@/store/reducers/apiReducer'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useCookies, Cookies } from 'react-cookie'

const Dashboard: FC = () => {
   const isLoading = useLoading()
   const cookies = useCookies(['user_id'])
   const { data: user, isError } = useGetUserQuery({ userId: new Cookies().get('user_id') })
   const router = useRouter()
   const user_id = new Cookies().get('user_id')

   useEffect(() => {
      if (!user_id || isError) {
         router.push({ pathname: '/' })
         return
      }
   }, [user, cookies])

   if (isLoading) return <Loader />

   return (
      <>
         <DashboardTemplate />
      </>
   )
}
export default Dashboard
