import { useEffect, useState } from 'react'

export default function useLoading() {
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(false)
   })

   return isLoading
}
