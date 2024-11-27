import { useCreateBusinessWorkMutation } from '@/store/reducers/businessApiReducer'
import Image from 'next/image'
import React, { FC } from 'react'
import css from './Buttons.module.scss'
import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'

const AddWorkButton: FC = () => {
   const [createWork, { isLoading, isSuccess, isError }] = useCreateBusinessWorkMutation()

   useSnackbarVariant({
      isError,
      isSuccess,
      successMessage: 'business.messages-004',
      errorMessage: 'business.messages-005'
   })

   const add_work = async () => {
      await createWork('design')
   }

   return (
      <div className={css.add_btn}>
         <button onClick={add_work}>
            {isLoading ? (
               <Image src={'/assets/images/svg/simple-loader.svg'} width={16} height={16} alt='loader' />
            ) : (
               <span>+</span>
            )}
         </button>
      </div>
   )
}

export default AddWorkButton
