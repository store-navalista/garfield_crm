import translate from '@/i18n/translate'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '@/store/reducers/apiReducer'
import React, { Dispatch, FC, SetStateAction, useEffect, useReducer, useState } from 'react'
import { useIntl } from 'react-intl'
import { UI } from '../../UI'
import css from '../Employees.module.scss'
import { LogType } from './Logs'
import user_log from './logs-messages'

type FieldsType = 'describe_name' | 'describe_date' | 'describe_specialization' | 'describe_position'

interface UpdateUserData {
   describe_name: string
   describe_date: string
   describe_specialization: string
   describe_position: string
}

interface ChangeUserAction {
   type: FieldsType | 'RESET'
   payload: string
}

type UserDescriptionProps = UpdateUserData & {
   id: string
   setLog: Dispatch<SetStateAction<LogType>>
}

const UserDescription: FC<UserDescriptionProps> = ({
   id,
   describe_name,
   describe_date,
   describe_specialization,
   describe_position,
   setLog
}) => {
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })
   const [deleteUser, { isLoading: delete_loading }] = useDeleteUserMutation()
   const [updateUser, { isLoading }] = useUpdateUserMutation()
   const { data: users } = useGetUsersQuery()
   const { refetch } = useGetUsersQuery()
   const data = { describe_name, describe_date, describe_specialization, describe_position }
   const [canSave, setCanSave] = useState(false)
   const [isModal, setisModal] = useState(false)
   const [updateUserData, setUpdateUserData] = useReducer((state: UpdateUserData, action: ChangeUserAction) => {
      switch (action.type) {
         case 'describe_name':
            return { ...state, describe_name: action.payload }
         case 'describe_date':
            return { ...state, describe_date: action.payload }
         case 'describe_specialization':
            return { ...state, describe_specialization: action.payload }
         case 'describe_position':
            return { ...state, describe_position: action.payload }
         case 'RESET':
            return { ...state, ...data }
         default:
            state
      }
   }, data)

   const deleteUserHandler = async (): Promise<any> => {
      const result = await deleteUser({ id })

      if ('error' in result) {
         user_log(setLog, '102', describe_name)
         return result
      }

      user_log(setLog, '002', describe_name)
      await refetch()
   }

   const updateUserHandler = async (): Promise<any> => {
      const excludeUser = users.filter((user) => user.id !== id)
      const isNameExist = excludeUser.find((user) => user.describe_name === updateUserData.describe_name)

      if (isNameExist) return user_log(setLog, '111', describe_name)

      const result = await updateUser({ id, updateUserData })

      if ('error' in result) {
         user_log(setLog, '103', describe_name)
         return result
      }

      user_log(setLog, '003', describe_name)
      await refetch()
   }

   useEffect(() => {
      setCanSave(JSON.stringify(updateUserData) === JSON.stringify(data))
   }, [updateUserData])

   return (
      <div className={css.description}>
         <p>{translate('dashboard.users-details')}</p>
         <div className={css.details}>
            <div className={css.col}>
               {['describe_name', 'describe_date'].map((input: FieldsType) => {
                  return (
                     <UI.Input
                        key={input}
                        defaultValue={data[input]}
                        value={updateUserData[input]}
                        placeholder={staticTranslate(`dashboard.users-${input}-ph`)}
                        onChange={(e) => setUpdateUserData({ type: input, payload: e.target.value })}
                        label={staticTranslate(`dashboard.users-${input}`)}
                     />
                  )
               })}
            </div>
            <div className={css.col}>
               {['describe_specialization', 'describe_position'].map((input: FieldsType) => {
                  return (
                     <UI.Input
                        key={input}
                        defaultValue={data[input]}
                        value={updateUserData[input]}
                        onChange={(e) => setUpdateUserData({ type: input, payload: e.target.value })}
                        placeholder={staticTranslate(`dashboard.users-${input}-ph`)}
                        label={staticTranslate(`dashboard.users-${input}`)}
                     />
                  )
               })}
            </div>
            <div className={css.buttons}>
               <button
                  onClick={() => setUpdateUserData({ type: 'RESET', payload: '' })}
                  className={css.refresh}
                  disabled={canSave}
               />
               <button
                  onClick={updateUserHandler}
                  className={css.save + `${isLoading ? ' ' + css.isLoading : ''}`}
                  disabled={canSave || isLoading}
               />
               <button onClick={() => setisModal(true)} className={css.remove} />
            </div>
         </div>
         {isModal && (
            <UI.Confirm isLoading={delete_loading} apply={deleteUserHandler} cancel={() => setisModal(false)} />
         )}
      </div>
   )
}

export default UserDescription
