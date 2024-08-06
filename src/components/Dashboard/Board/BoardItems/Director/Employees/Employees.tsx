import PortalModal from '@/components/UI/modals/PortalModal'
import { useGetUsersQuery } from '@/store/reducers/apiReducer'
import React, { FC, useEffect, useState } from 'react'
import css from './Employees.module.scss'
import Logs, { LogType } from './components/Logs'
import NewUser from './components/NewUser'
import User from './components/User'
import translate from '@/i18n/translate'

export interface LogProps {
   log: LogType
   setLog: React.Dispatch<React.SetStateAction<LogType>>
}

const Employees: FC = () => {
   const { data: users, error, isLoading } = useGetUsersQuery()

   const [log, setLog] = useState({ message: '', code: '' })
   const [sortedUsers, setSortedUsers] = useState([])
   const [expand, setExpand] = useState(null)
   const [isModal, setisModal] = useState(false)

   useEffect(() => {
      if (users) {
         setSortedUsers([...users].sort((a, b) => a.describe_name.localeCompare(b.describe_name)))
      }
   }, [users])

   useEffect(() => {
      setExpand(sortedUsers.map((user) => ({ id: user.id, isOpen: false })))
   }, [sortedUsers])

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (error) {
      return <div>{(error as { message: string }).message}</div>
   }

   return (
      <div className={css.wrapper}>
         <p className={css.title}>{translate('dashboard.users-title')}</p>
         {sortedUsers.map((user) => {
            return <User key={user.id} {...{ expand, setExpand, user, setLog }} />
         })}
         <Logs message={log.message} />
         <button onClick={() => setisModal(true)} className={css.add_user} />
         {isModal ? (
            <PortalModal>
               <NewUser {...{ setisModal, setLog }} />
            </PortalModal>
         ) : null}
      </div>
   )
}

export default Employees
