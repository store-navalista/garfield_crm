import { useEffect } from 'react'

export default function useOverflow(isOpen: boolean) {
   useEffect(() => {
      if (isOpen) {
         document.documentElement.style.overflow = 'hidden'
      } else {
         document.documentElement.style.overflow = ''
      }

      return () => {
         document.documentElement.style.overflow = ''
      }
   }, [isOpen])
}
