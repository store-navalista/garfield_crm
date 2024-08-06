import Portal from '@/HOC/Portal'
import React, { FC, ReactNode } from 'react'
import css from './PortalModal.module.scss'

const PortalModal: FC<{ children: ReactNode }> = ({ children }) => {
   return (
      <Portal selector='#portal'>
         <div className={css.wrapper}>{children}</div>
      </Portal>
   )
}

export default PortalModal
