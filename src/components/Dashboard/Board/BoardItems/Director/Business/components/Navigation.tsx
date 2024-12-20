import React, { FC } from 'react'
import css from '../tabs/Tabs.module.scss'
import ReloadButton from './ReloadButton'
import SaveButton from './SaveButton'
import Image from 'next/image'
import translate from '@/i18n/translate'
import { useAppSelector } from '@/hooks/redux'
import { GlobalWorksTypes } from '@/constants/works'

type NavigationProps = {
   type: GlobalWorksTypes
}

const Navigation: FC<NavigationProps> = ({ type }) => {
   const message = useAppSelector((state) => state.reducer.business.isError)

   return (
      <div className={css.top_block}>
         <div className={css.navigation}>
            <SaveButton type={type} />
            {/* <ReloadButton {...{ refetch, isWorksLoading }} /> */}
         </div>
         {message ? (
            <div className={css.warning}>
               <Image src={'/assets/images/svg/timereport-job-alarm.svg'} alt='warning' width={14} height={14} />
               <p>{translate(`business.messages-${message}`)}</p>
            </div>
         ) : null}
      </div>
   )
}

export default Navigation
