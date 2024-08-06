import React from 'react'
import { FormattedMessage } from 'react-intl'
import { default as DM } from '@/i18n/messages/defaultMessages'

const translate = (id: string, value = {}) => {
   return DM[id] ? (
      <FormattedMessage id={id} defaultMessage={DM[id].defaultMessage} values={{ ...value }} />
   ) : (
      <FormattedMessage id='i18n_error' defaultMessage={DM['i18n_error']?.defaultMessage} values={{ ...value }} />
   )
}

export default translate
