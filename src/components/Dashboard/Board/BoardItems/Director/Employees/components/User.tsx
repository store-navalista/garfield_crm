import React, { CSSProperties, FC, useState } from 'react'
import css from '../Employees.module.scss'
import Image from 'next/image'
import UserDescription from './UserDescription'
import { UI } from '../../UI'
import { IUser } from '@/constants/users'
import { useUpdatePasswordMutation } from '@/store/reducers/apiReducer'
import { LogProps } from '../Employees'
import user_log from './logs-messages'

type UserProps = {
   expand: {
      id: string
      isOpen: boolean
   }[]
   setExpand: React.Dispatch<any>
   user: IUser
   setLog: LogProps['setLog']
}

const User: FC<UserProps> = ({ expand, setExpand, user, setLog }) => {
   if (!expand) return
   const { id, describe_name, describe_date, describe_specialization, describe_position, describe_role } = user

   const [password, setPassword] = useState('')
   const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

   const updatePasswordHandler = async () => {
      const result = await updatePassword({ id, newPassword: password })
      if ('error' in result) {
         user_log(setLog, '104', user.describe_name)
         return
      }

      user_log(setLog, '004', user.describe_name)
      setPassword('')
   }

   const URL = '/assets/images/dashboard/employees/mini-'
   const initialAvatar = URL + `${describe_name.toLowerCase().replace(/ /g, '-')}.png`
   const [avatar, setAvatar] = useState(initialAvatar)
   const userExpand = expand.find((item: { id: string; isOpen: boolean }) => item.id === user.id)

   const openDescription = () => {
      const correctExpands = expand.map((item) => {
         if (item.id === user.id) return { id, isOpen: !userExpand.isOpen }
         return item
      })
      setExpand(correctExpands)
   }

   return (
      <div className={css.users}>
         <div className={css.user}>
            <div className={css.info}>
               <button
                  onClick={openDescription}
                  className={css.expand}
                  style={
                     {
                        '--btn_bg': `url(/assets/images/svg/custom-button-icon-${
                           userExpand?.isOpen ? 'minus' : 'plus'
                        }.svg)`
                     } as CSSProperties
                  }
               />
               <Image
                  className={css.avatar}
                  alt='avatar'
                  src={avatar}
                  width={30}
                  height={30}
                  onError={() => setAvatar(URL + 'new-employe.png')}
               />
               <p className={css.name}>{describe_name}</p>
               <UI.Input data-type='id' icon='user-managment-id.svg' value={id} readOnly />
               <UI.Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  icon='user-managment-password.svg'
                  placeholder='Password'
               />
               <button
                  onClick={updatePasswordHandler}
                  className={css.save + `${isLoading ? ' ' + css.isLoading : ''}`}
                  disabled={isLoading || password.length < 5}
               />
            </div>
            {userExpand?.isOpen ? (
               <UserDescription
                  {...{
                     id,
                     describe_name,
                     describe_date,
                     describe_specialization,
                     describe_position,
                     describe_role,
                     setLog
                  }}
               />
            ) : null}
         </div>
      </div>
   )
}

export default User
