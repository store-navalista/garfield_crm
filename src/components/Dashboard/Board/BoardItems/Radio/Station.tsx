import { IStation } from '@/constants/radio'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import useHover from '@/hooks/useHover'
import { RadioActions } from '@/store/reducers/radioReducer'
import Image from 'next/image'
import React, { FC, useMemo, useRef } from 'react'
import css from '../Boards.module.scss'
import Button from './Button'

const Station: FC<{ s: IStation }> = ({ s }) => {
   const dispatch = useAppDispatch()
   const radioData = useAppSelector((state) => state.reducer.radio)
   const ref = useRef(null)
   const isHover = useHover(ref)
   const { stream, meta, id } = s

   const isCurrentStation = useMemo(() => {
      return radioData.isPlaying && radioData.current.stream === stream
   }, [radioData.isPlaying, radioData.current])

   const handlePlay = async () => {
      dispatch(RadioActions.setIsRadioNavigate(true))
      if (radioData.current.stream === stream) {
         dispatch(RadioActions.playToggle(!radioData.isPlaying))
      } else {
         dispatch(RadioActions.setCurrentStation({ ...radioData.current, stream, meta, id }))
         dispatch(RadioActions.playToggle(true))
      }
   }

   return (
      <div ref={ref} className={css.station}>
         <div className={css.image_wrapper}>
            <Image src={`/assets/images/radio/stations/${id}/avatar.jpg`} alt='station avatar' fill />
         </div>
         <div className={css.buttons}>
            <Button isEnable={isCurrentStation} handle={handlePlay} />
         </div>
      </div>
   )
}

export default Station
