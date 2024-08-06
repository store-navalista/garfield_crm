import React, { FC } from 'react'
import css from './Map.module.scss'
import GoogleMapReact from 'google-map-react'
import { MAPProps } from '@/constants/data'

const Marker: FC<{
   lat: number
   lng: number
}> = () => (
   <div className={css.marker}>
      <span />
   </div>
)

export const Map = () => {
   return (
      <div className={css.wrapper}>
         <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyC4IBXcJYRoUPljEc8uhG_WK855ZCzn0gA' }}
            defaultCenter={MAPProps.center}
            defaultZoom={MAPProps.zoom}
            yesIWantToUseGoogleMapApiInternals
         >
            <Marker lat={MAPProps.center.lat} lng={MAPProps.center.lng} />
         </GoogleMapReact>
      </div>
   )
}
