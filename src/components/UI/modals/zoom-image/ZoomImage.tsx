import { useAppDispatch } from '@/hooks/redux'
import { ContentActions } from '@/store/reducers/contentReducer'
import React, { FC, useEffect, useState } from 'react'
import Loader from '../../loader/Loader'
import css from './ZoomImage.module.scss'

const ZoomImage: FC<{ image: string }> = ({ image }) => {
   const src = `/assets/images/pages/main/slider/${image}`
   const [isLoading, setLoading] = useState(true)
   const dispatch = useAppDispatch()

   const close = () => {
      dispatch(ContentActions.setModalProps(null))
      dispatch(ContentActions.toggleModalShow(false))
   }

   useEffect(() => {
      const i = new Image()
      i.src = src
      i.onload = () => setLoading(false)
   })

   return (
      <div className={css.portal}>
         {isLoading ? (
            <div onClick={close} className={css.loader}>
               <Loader className={css.wrapper} />
            </div>
         ) : (
            <div onClick={close} style={{ backgroundImage: `url(${src})` }} className={css.image} />
         )}
      </div>
   )
}

export default ZoomImage
