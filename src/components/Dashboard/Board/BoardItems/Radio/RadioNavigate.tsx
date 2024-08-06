import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { RadioActions } from '@/store/reducers/radioReducer'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import React, { FC, useEffect, useRef } from 'react'
import Button from './Button'
import css from './RadioNavigate.module.scss'

type RadioNavigateProps = {
   isOpen: boolean
   notNullVolume: number
   setNotNullVolume: React.Dispatch<React.SetStateAction<number>>
}

const RadioNavigate: FC<RadioNavigateProps> = ({ isOpen, notNullVolume, setNotNullVolume }) => {
   const radioData = useAppSelector((state) => state.reducer.radio)
   const dispatch = useAppDispatch()
   const audioRef = useRef(null)

   const handleVolume = (e) => {
      dispatch(RadioActions.setVolume(e.target.value / 100))
   }

   const handleClose = () => {
      dispatch(RadioActions.setIsRadioNavigate(false))
      dispatch(RadioActions.playToggle(false))
   }

   useEffect(() => {
      if (radioData.volume !== 0) setNotNullVolume(radioData.volume)
      audioRef.current.volume = radioData.volume
   }, [radioData.volume])

   useEffect(() => {
      if (radioData.isPlaying) {
         audioRef.current.play()
      } else {
         audioRef.current.pause()
      }
   }, [radioData.isPlaying, radioData.current])

   const sx = {
      '& .MuiSlider-thumb': {
         height: 16,
         width: 16,
         color: 'var(--main-blue)',
         '&:hover': {
            boxShadow: '0px 0px 0 4px rgba(25, 118, 210, 0.16);'
         }
      },
      '& .MuiSlider-rail': {
         color: 'var(--main-blue)'
      },
      '& .Mui-active': {
         color: 'var(--main-blue)'
      },
      '& .MuiSlider-track': {
         color: 'var(--main-blue)'
      }
   }

   return (
      <div style={{ left: !isOpen ? '19px' : '252px' }} className={css.radio_nav}>
         <Button
            isEnable={radioData.isPlaying}
            handle={() => dispatch(RadioActions.playToggle(!radioData.isPlaying))}
         />
         <Box sx={{ height: 200 }}>
            <Slider
               sx={sx}
               onChange={handleVolume}
               orientation='vertical'
               value={radioData.volume * 100}
               defaultValue={80}
               aria-label='Sound volume'
               color='primary'
            />
         </Box>
         <Button
            isEnable={radioData.volume === 0}
            handle={() =>
               radioData.volume !== 0
                  ? dispatch(RadioActions.setVolume(0))
                  : dispatch(RadioActions.setVolume(notNullVolume))
            }
            toggleIcons={['mute', 'unmute']}
         />
         <div className={css.close}>
            <button onClick={handleClose}>×</button>
         </div>
         <audio ref={audioRef} src={radioData.current.stream} />
      </div>
   )
}

export default RadioNavigate
