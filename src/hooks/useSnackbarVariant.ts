import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'

interface SnackbarEffectOptions {
   isError?: boolean
   isSuccess?: boolean
   successMessage?: string
   errorMessage?: string
}

export const useSnackbarVariant = ({ isError, isSuccess, successMessage, errorMessage }: SnackbarEffectOptions) => {
   const { enqueueSnackbar } = useSnackbar()
   const intl = useIntl()
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })

   useEffect(() => {
      if (isError && errorMessage) {
         enqueueSnackbar(staticTranslate(errorMessage), { variant: 'error' })
      }
      if (isSuccess && successMessage) {
         enqueueSnackbar(staticTranslate(successMessage), { variant: 'success' })
      }
   }, [isError, isSuccess])
}
