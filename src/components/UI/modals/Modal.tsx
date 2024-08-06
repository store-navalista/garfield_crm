import { useAppSelector } from '@/hooks/redux'
import { IZoomImage } from '@/types/modals'
import React, { FC } from 'react'
import css from './Modal.module.scss'
import ZoomImage from './zoom-image/ZoomImage'

const Modal: FC<IZoomImage> = (props) => {
   const isModalShow = useAppSelector((state) => state.reducer.content.isModalShow)
   const { type } = props

   switch (type) {
      case 'zoomImage':
         return (
            isModalShow && <div className={css.wrapper}>{'zoomImage' && isModalShow && <ZoomImage {...props} />}</div>
         )
      default:
         break
   }
}

export default Modal
