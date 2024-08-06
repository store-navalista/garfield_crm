import translate from '@/i18n/translate'
import { useCreateUserMutation, useGetCTOQuery, useGetUsersQuery } from '@/store/reducers/apiReducer'
import Image from 'next/image'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { useIntl } from 'react-intl'
import { UI } from '../../UI'
import css from '../Employees.module.scss'
import { LogType } from './Logs'
import user_log from './logs-messages'

type FieldsType =
   | 'describe_name'
   | 'describe_date'
   | 'describe_specialization'
   | 'describe_position'
   | 'describe_password'

interface CreateUserData {
   describe_name: string
   describe_date: string
   describe_specialization: string
   describe_position: string
   describe_password: string
   CTO: boolean
}

interface ChangeUserAction {
   type: FieldsType
   payload: string
}

interface NewUserProps {
   setisModal: React.Dispatch<React.SetStateAction<boolean>>
   setLog: React.Dispatch<React.SetStateAction<LogType>>
   role?: 'Employee' | 'CTO'
}

const NewUser: FC<NewUserProps> = ({ setisModal, setLog, role = 'Employee' }) => {
   const [createUser, { error, isLoading }] = useCreateUserMutation()
   const [errorMessage, setErrorMessage] = useState({ type: '', message: '' })
   const { refetch } = useGetUsersQuery()
   const { refetch: CTO_refetch } = useGetCTOQuery()

   const initialState = {
      describe_name: '',
      describe_date: '',
      describe_specialization: '',
      describe_position: '',
      describe_password: '',
      CTO: role === 'CTO'
   }

   const [userData, setUserData] = useReducer((state: CreateUserData, action: ChangeUserAction) => {
      switch (action.type) {
         case 'describe_name':
            return { ...state, describe_name: action.payload }
         case 'describe_date':
            return { ...state, describe_date: action.payload }
         case 'describe_specialization':
            return { ...state, describe_specialization: action.payload }
         case 'describe_position':
            return { ...state, describe_position: action.payload }
         case 'describe_password':
            return { ...state, describe_password: action.payload }
         default:
            state
      }
   }, initialState)

   const fields: FieldsType[] = [
      'describe_name',
      'describe_date',
      'describe_specialization',
      'describe_position',
      'describe_password'
   ]
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })

   useEffect(() => {
      if (error) {
         setErrorMessage({
            type: 'server',
            message: `custom.server-errors_${(error as { message: string }).message.match(/^([^:]+)/)[0]}`
         })
      }
   }, [error])

   const addUser = async () => {
      const ifErr = await checkErrors()

      if (ifErr) return

      const newUser = await createUser(userData)

      if ('error' in newUser) {
         user_log(setLog, '101', userData.describe_name)
         setErrorMessage({ type: '', message: `` })
         setisModal(false)
         return
      }

      user_log(setLog, '001', userData.describe_name)
      role === 'Employee' ? await refetch() : await CTO_refetch()
      setisModal(false)
   }

   const checkErrors = async () => {
      const intl = 'custom.client-errors_'
      const { describe_name, describe_password } = userData
      if (!describe_name || describe_name.length < 5) {
         setErrorMessage({ type: 'describe_name', message: `${intl}user_input_empty` })
         return true
      }
      if (!describe_password || describe_password.length < 5) {
         setErrorMessage({ type: 'describe_password', message: `${intl}password_input_empty` })
         return true
      }
      setErrorMessage({ type: '', message: '' })
      return false
   }

   return (
      <div className={css.new_user}>
         <button onClick={() => setisModal(false)} className={css.close} disabled={isLoading}>
            ✖
         </button>
         <p>{translate('dashboard.users-create_user')}</p>
         <div className={css.inputs}>
            {fields.map((field) => {
               return (
                  <div className={css.input_box} key={field}>
                     <p>{translate(`dashboard.users-${field}`)}</p>
                     <UI.Input
                        onChange={(e) => setUserData({ type: field, payload: e.target.value })}
                        isPassword={field === 'describe_password'}
                        icon={`user-${field}.svg`}
                        placeholder={staticTranslate(`dashboard.users-${field}-ph`)}
                        iconWidth={[10, 10]}
                        isInvalid={errorMessage.type === field}
                     />
                  </div>
               )
            })}
            <div className={css.input_box}>
               <p>{translate('dashboard.users-describe_role')}</p>
               <UI.Input locked icon='user-describe_role.svg' value={role} readOnly />
            </div>
         </div>
         {errorMessage.message ? <p className={css.error_message}>{translate(errorMessage.message)}</p> : null}
         <button onClick={addUser} className={css.create} disabled={isLoading}>
            {!isLoading ? translate('dashboard.users-create_user-btn') : null}
            <Image
               style={{ filter: 'invert(1)', display: isLoading ? 'block' : 'none' }}
               src='/assets/images/svg/request-loader.svg'
               width={14}
               height={14}
               alt='loader'
            />
         </button>
      </div>
   )
}

export default NewUser
