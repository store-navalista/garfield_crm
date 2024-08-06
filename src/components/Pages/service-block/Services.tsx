import React, { FC } from 'react'
import translate from '@/i18n/translate'
import css from './Services.module.scss'
import ServicesBlock from './ServicesBlock'
import { TServicesObjectProps } from '@/constants/types'

const Services: FC<{ chapters: string[]; services: TServicesObjectProps }> = ({ chapters, services }) => {
   return (
      <div className={css.wrapper}>
         <h2>{translate('main-services', 'Services')}</h2>
         <section>
            <ServicesBlock chapters={chapters} services={services} />
         </section>
      </div>
   )
}

export default Services
