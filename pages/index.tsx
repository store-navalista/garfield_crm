import Auth from '@/components/Auth/Auth'
import Loader from '@/components/UI/loader/Loader'
import { PagesData as content } from '@/i18n/pages/locales'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'

const Home: NextPage = () => {
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(false)
   })

   if (isLoading) return <Loader />

   return (
      <>
         <Auth />
      </>
   )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
   return {
      props: {
         content
      }
   }
}
