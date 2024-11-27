import Image from 'next/image'
import React, { FC } from 'react'
import css from './Buttons.module.scss'
import { useAppDispatch } from '@/hooks/redux'
import { businessApi } from '@/store/reducers/businessApiReducer'

const ReloadButton: FC<{ refetch(): void; isWorksLoading: boolean }> = ({ refetch, isWorksLoading }) => {
   const dispatch = useAppDispatch()
   const reload = () => {
      dispatch(businessApi.util.invalidateTags([{ type: 'BusinessWork' }]))
   }

   return (
      <div className={css.save}>
         {isWorksLoading ? (
            <Image src={'/assets/images/svg/simple-loader.svg'} width={20} height={20} alt='loader' />
         ) : null}
         {!isWorksLoading ? (
            <button
               style={{ backgroundImage: 'url(/assets/images/svg/job-reload.svg)' }}
               onClick={reload}
               disabled={isWorksLoading}
            />
         ) : null}
      </div>
   )
}

export default ReloadButton
