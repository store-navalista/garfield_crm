import { useAppSelector } from '@/hooks/redux'
import { useUpdateBusinessWorksMutation } from '@/store/reducers/businessApiReducer'
import Image from 'next/image'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import css from './Buttons.module.scss'
import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'
import { GlobalWorksTypes } from '@/constants/works'

const SaveButton: FC<{ type: GlobalWorksTypes }> = ({ type }) => {
   const intl = useIntl()
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })
   const works = useAppSelector((state) => state.reducer.business).data
   const [updateWork, { isLoading: isUpdating, isSuccess, isError }] = useUpdateBusinessWorksMutation()
   const message = useAppSelector((state) => state.reducer.business.isError)

   useSnackbarVariant({
      isError,
      isSuccess,
      successMessage: staticTranslate('business.messages-002'),
      errorMessage: staticTranslate('business.messages-003')
   })

   const save = async () => {
      await updateWork({ updateBusinessWorkInput: works, type: type })
   }

   return (
      <div className={css.save}>
         {isUpdating ? (
            <Image src={'/assets/images/svg/simple-loader.svg'} width={20} height={20} alt='loader' />
         ) : null}
         {!isUpdating ? (
            <button
               style={{ backgroundImage: 'url(/assets/images/svg/job-save.svg)' }}
               onClick={save}
               disabled={isUpdating || !!message}
            />
         ) : null}
      </div>
   )
}

export default SaveButton
