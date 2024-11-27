import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'
import { useDeleteWorkByTypeAndIdMutation } from '@/store/reducers/businessApiReducer'
import Image from 'next/image'
import React, { FC } from 'react'
import css from './Buttons.module.scss'

const DeleteButton: FC<{ id: string }> = ({ id }) => {
   const [deleteWork, { isLoading: isDeleting, isSuccess, isError }] = useDeleteWorkByTypeAndIdMutation()

   const delete_work = async () => {
      const result = confirm('Are you sure you want to delete this work?')
      if (result) {
         await deleteWork({ type: 'design', id })
      }
   }

   useSnackbarVariant({
      isError,
      isSuccess,
      successMessage: 'business.messages-006',
      errorMessage: 'business.messages-007'
   })

   return (
      <div className={css.delete}>
         {isDeleting ? (
            <Image src={'/assets/images/svg/simple-loader.svg'} width={20} height={20} alt='loader' />
         ) : null}
         {!isDeleting ? (
            <button
               style={{ backgroundImage: 'url(/assets/images/svg/job-remove.svg)' }}
               onClick={delete_work}
               disabled={isDeleting}
            />
         ) : null}
      </div>
   )
}

export default DeleteButton
