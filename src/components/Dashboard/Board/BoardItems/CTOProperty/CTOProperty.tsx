import Loader from '@/components/UI/loader/Loader'
import translate from '@/i18n/translate'
import React, { FC, useEffect, useState } from 'react'
import css from '../Director/Employees/Employees.module.scss'
import useUserByID from '@/hooks/useUserByID'
import PortalModal from '@/components/UI/modals/PortalModal'
import NewUser from '../Director/Employees/components/NewUser'
import Logs from '../Director/Employees/components/Logs'
import { useGetCTOQuery } from '@/store/reducers/apiReducer'
import CTOParameters from './CTOParameters'

const CTOProperty: FC = () => {
   const { data: user = {} } = useUserByID()
   const [isModal, setisModal] = useState(false)
   const { data: CTO, isSuccess } = useGetCTOQuery()
   const [log, setLog] = useState({ message: '', code: '' })

   if (!user) return <Loader />

   return (
      <div className={css.wrapper}>
         {!CTO ? <p>{translate('dashboard.users-cto-empty')}</p> : <CTOParameters />}
         <Logs message={log.message} />
         {!CTO ? <button onClick={() => setisModal(true)} className={css.add_user} /> : null}
         {isModal ? (
            <PortalModal>
               <NewUser {...{ setisModal, setLog, role: 'CTO' }} />
            </PortalModal>
         ) : null}
      </div>
   )
}

export default CTOProperty
