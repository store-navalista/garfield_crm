import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children, selector }: { children: ReactNode; selector: string }) => {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])

   return mounted ? createPortal(children, document.querySelector(selector)) : null
}

export default Portal
