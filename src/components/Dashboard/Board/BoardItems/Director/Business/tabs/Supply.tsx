import React, { FC } from 'react'
import css from './Tabs.module.scss'
import InDevelopment from '@/components/Header/components/InDevelopment/InDevelopment'

const Supply: FC = () => {
   return (
      <div className={css.wrapper}>
         <InDevelopment />
      </div>
   )
}

export default Supply
