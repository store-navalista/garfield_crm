import React, { useState } from 'react'
import Button from './components/Button'
import Dropdown from './components/Dropdown'

const MenuMobile = () => {
   const [isOpen, toggle] = useState(false)

   return (
      <>
         <Button isOpen={isOpen} toggle={toggle} />
         <Dropdown isOpen={isOpen} toggle={toggle} />
      </>
   )
}

export default MenuMobile
