import React, { FC, useState } from 'react'
import { ILayoutComponentProps } from '@/types/layout'
import FooterMenu from './FooterMenu'
import FooterPartners from './FooterPartners'

const Footer: FC<ILayoutComponentProps> = ({ scrollStep, isLaptop }) => {
   const [isFooterMenuOpen, setisFooterMenu] = useState(true)
   return (
      <>
         {/* <FooterPartners setisFooterMenu={setisFooterMenu} /> */}
         {!isLaptop && <FooterMenu scrollStep={scrollStep} isFooterMenuOpen={isFooterMenuOpen} />}
      </>
   )
}

export default Footer
