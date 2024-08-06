import { useEffect } from 'react'

export default function useOutsideClick(ref: any, callback: any) {
   useEffect(() => {
      const handleClickOutside = (event: any) => {
         if (ref.current && !ref.current.contains(event.target)) {
            callback()
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [ref, callback])
}
