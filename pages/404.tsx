import translate from '@/i18n/translate'
import Link from 'next/link'
import React from 'react'
import css from './404.module.scss'
import { ContentActions } from '@/store/reducers/contentReducer'
import { useAppDispatch } from '@/hooks/redux'

export default function Custom404() {
   const dispatch = useAppDispatch()

   return (
      <div className={css.not_page}>
         <h1>{translate('404')}</h1>
         <span />
         <Link href='/' onClick={() => dispatch(ContentActions.setID('HOME'))}>
            {translate('404.button')}
         </Link>
      </div>
   )
}
