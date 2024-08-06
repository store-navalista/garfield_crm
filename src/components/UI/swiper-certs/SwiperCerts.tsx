import { ICert } from '@/constants/certificates'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import useMD from '@/hooks/useMD'
import translate from '@/i18n/translate'
import { ContentActions } from '@/store/reducers/contentReducer'
import Image from 'next/image'
import React, { FC, MouseEvent } from 'react'
import { EffectCards } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { Swiper, SwiperSlide } from 'swiper/react'
import Modal from '../modals/Modal'
import css from './SwiperCerts.module.scss'

const SwiperCerts: FC<{ certs: ICert[] }> = ({ certs }) => {
   const modalProps = useAppSelector((state) => state.reducer.content.modalProps)
   const dispatch = useAppDispatch()

   const Content = useMD()

   const zoom = (e: MouseEvent<HTMLButtonElement>, src: string) => {
      dispatch(ContentActions.setModalProps(src))
      dispatch(ContentActions.toggleModalShow(true))
   }

   return (
      <div className={css.wrapper}>
         <div className={css.block}>
            <h2>{translate('main.certificate-heading')}</h2>
            <div>
               <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className={css.swiper}>
                  {certs.map((item, i: number) => {
                     const { img, active } = item
                     const PATH = '/assets/images/pages/main/slider/'

                     return active ? (
                        <SwiperSlide key={i} className={css.slide}>
                           <Image src={`${PATH}min-${img}`} alt='image' width={300} height={429} />
                           <button onClick={(e) => zoom(e, img)} />
                        </SwiperSlide>
                     ) : null
                  })}
               </Swiper>
               <Content className={css.content} type='cert_desc' />
            </div>
         </div>
         <Modal type='zoomImage' image={modalProps} />
      </div>
   )
}

export default SwiperCerts
