import { STATIONS } from '@/constants/radio'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { RadioActions } from '@/store/reducers/radioReducer'
import React, { FC, Fragment, useCallback, useEffect } from 'react'
import css from '../Boards.module.scss'
import Station from './Station'
import { useMediaQuery } from 'react-responsive'

const Radio: FC = () => {
   const radioData = useAppSelector((state) => state.reducer.radio)
   const dispatch = useAppDispatch()
   const currentStation = STATIONS.filter((s) => s.id === radioData.current.id)[0]
   const aside_station = currentStation?.meta_type && radioData.description[0]
   const W1200 = useMediaQuery({ query: '(max-width: 1200px)' })

   let metadata = radioData.description

   const get_meta = (type: any) => {
      switch (type) {
         case 'kiss_fm_deep': {
            if (aside_station) {
               return {
                  artist: radioData.description[0][currentStation?.meta_type[1][0]],
                  title: radioData.description[0][currentStation?.meta_type[1][1]]
               }
            }
            return { artist: 'unknown', title: 'unknown' }
         }
         default:
            return radioData.description
      }
   }

   if (aside_station) {
      metadata = get_meta(currentStation?.meta_type[0])
   }

   const { artist, title } = metadata

   const fetchData = useCallback(async () => {
      try {
         if (radioData.current.meta) {
            const response = await fetch(radioData.current.meta)
            const result = await response.json()
            if (result) dispatch(RadioActions.setDescription(result))
         }
      } catch (error) {
         dispatch(RadioActions.setDescription({ title: 'Unknown', artist: 'Unknown' }))
         console.error('Error fetching data:', error)
      }
   }, [dispatch, radioData.current.meta])

   useEffect(() => {
      fetchData()

      const interval = setInterval(fetchData, 10000)

      return () => clearInterval(interval)
   }, [fetchData])

   return (
      <div className={css.radio}>
         <div className={css.flex}>
            {STATIONS.map((s) => {
               return (
                  <Fragment key={s.title}>
                     <Station s={s} />
                  </Fragment>
               )
            })}
         </div>
         {!W1200 ? (
            <div className={css.description}>
               <h2>{currentStation?.title ?? 'Station'}</h2>
               <h3>{artist}</h3>
               <p>{title}</p>
            </div>
         ) : null}
      </div>
   )
}

export default Radio
