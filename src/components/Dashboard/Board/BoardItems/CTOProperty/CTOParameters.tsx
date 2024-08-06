import { IUser } from '@/constants/users'
import translate from '@/i18n/translate'
import { useGetCTOQuery, useUpdatePasswordMutation, useUpdateUserMutation } from '@/store/reducers/apiReducer'
import React, { FC, useEffect, useState } from 'react'
import css from './CTOParameters.module.scss'

const fields = ['describe_name', 'mail']

type UpdateData = Omit<IUser, 'describe_role' | 'id' | 'jobs' | 'desc' | 'describe_password'>

const CTOParameters: FC = () => {
   const { data: CTO, refetch } = useGetCTOQuery()
   const [updateCTO, { isLoading: userUpdating }] = useUpdateUserMutation()
   const [updatePassword, { isLoading: passwordUpdating, isSuccess: isSuccessPassword }] = useUpdatePasswordMutation()
   const [updateUserData, setUpdateUserData] = useState<UpdateData>()
   const [passwordData, setPasswordData] = useState({ password: '', isPassword: true, isHidden: true })
   const [canSave, setcanSave] = useState(true)

   const comparsion = () => {
      const NulltoStringServer = CTO.mail || ''
      const NulltoStringState = updateUserData?.mail || ''

      return updateUserData?.describe_name === CTO.describe_name && NulltoStringState === NulltoStringServer
   }

   useEffect(() => {
      setUpdateUserData({
         describe_name: CTO.describe_name,
         describe_date: CTO.describe_date,
         describe_position: CTO.describe_position,
         describe_specialization: CTO.describe_specialization,
         mail: CTO.mail
      })
   }, [CTO])

   useEffect(() => {
      if (updateUserData) {
         setcanSave(comparsion())
      }
   }, [updateUserData])

   const update = async () => {
      if (updateUserData) {
         await updateCTO({ id: CTO.id, updateUserData })

         if (passwordData?.password) {
            await updatePassword({ id: CTO.id, newPassword: passwordData.password })
         }
      }

      await refetch()
   }

   useEffect(() => {
      if (isSuccessPassword) setPasswordData({ ...passwordData, password: '' })
   }, [isSuccessPassword])

   return (
      <div className={css.properties}>
         {fields.map((f, i) => {
            return (
               <div key={i} className={css.input}>
                  <p>{translate(`dashboard.users-${f}`)}</p>
                  <input
                     value={updateUserData?.[f] ?? ''}
                     onChange={(e) => setUpdateUserData({ ...updateUserData, [f]: e.target.value })}
                  />
               </div>
            )
         })}
         <div className={css.input}>
            <p>{translate('dashboard.users-describe_password')}</p>
            <input
               value={passwordData.password}
               onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
               type={passwordData.isPassword && passwordData.isHidden ? 'password' : 'text'}
            />
            <button
               onClick={() => setPasswordData({ ...passwordData, isHidden: !passwordData.isHidden })}
               style={{
                  backgroundImage: `url(/assets/images/svg/user-password-${
                     passwordData.isHidden ? 'hide' : 'show'
                  }.svg)`
               }}
               className={css.eye}
            />
            <button
               onClick={update}
               className={css.save + `${userUpdating || passwordUpdating ? ' ' + css.isLoading : ''}`}
               disabled={canSave && !passwordData.password}
            />
         </div>
      </div>
   )
}

export default CTOParameters
