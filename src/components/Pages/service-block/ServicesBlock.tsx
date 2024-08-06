import { CHAPTERS, SERVICES } from '@/constants/pages'
import { TServicesObjectProps } from '@/constants/types'
import translate from '@/i18n/translate'
import React, { FC } from 'react'
import ServiceItem from './ServiceItem'
import css from './ServicesBlock.module.scss'

const ServicesBlock: FC<{ chapters: string[]; services: TServicesObjectProps }> = ({ chapters, services }) => {
   const servicesArr = Object.keys(services).map((key) => ({ [key]: services[key] }))

   return (
      <>
         {chapters.map((chapter: string, i: number) => {
            const ch = Object.values(CHAPTERS[i])[0]
            const filteredArr = ch.map((c: string) => servicesArr.find((s) => c in s)) as TServicesObjectProps[]

            return (
               <div key={i} className={css.wrapper}>
                  <h3>{translate(`services.title-${chapter}`)}</h3>
                  <div className={css.block}>
                     {filteredArr.map((service, i) => {
                        const [key, value] = Object.entries(service)[0]
                        const constants = SERVICES.find((s) => key in s)[key]
                        const srv = { ...value, ...constants }

                        return <ServiceItem key={i} service={srv} id={key} />
                     })}
                  </div>
               </div>
            )
         })}
      </>
   )
}

export default ServicesBlock
