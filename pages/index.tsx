import Auth from '@/components/Auth/Auth'
import Loader from '@/components/UI/loader/Loader'
import { NextPage } from 'next'
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
