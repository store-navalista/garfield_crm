import { useCycle } from 'framer-motion'
import React from 'react'
import Board from './Board/Board'
import { Menu } from './Menu/Menu'

export const DashboardTemplate = () => {
   const [isOpen, toggleOpen] = useCycle(false, true)

   return (
      <>
         <Menu isOpen={isOpen} toggleOpen={toggleOpen} />
         <Board isOpen={isOpen} />
      </>
   )
}
