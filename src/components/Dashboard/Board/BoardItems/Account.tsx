import Loader from '@/components/UI/loader/Loader'
import { IUser } from '@/constants/users'
import translate from '@/i18n/translate'
import { useGetUserQuery } from '@/store/reducers/apiReducer'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import css from './Boards.module.scss'

const rows = ['name', 'date', 'specialization', 'position', 'role']

const Account: FC<{ user: IUser }> = ({ user }) => {
   const w = 250

   if (!user) return <Loader />

   const { refetch } = useGetUserQuery({ userId: user.id })
   const { describe_name } = user
   const avatar = describe_name.toLowerCase().replace(/[\s_-]+/g, '-')
   const URL = '/assets/images/dashboard/employees/'
   const [actualAvatar, setAvatar] = useState(`${URL}${avatar}.png`)

   const refresh = async () => await refetch()

   useEffect(() => {
      refresh()
   }, [])

   return (
      <div className={css.account}>
         <div className={css.avatar}>
            <div>
               <Image
                  src={actualAvatar}
                  alt={'Person'}
                  width={w}
                  height={w}
                  onError={() => setAvatar(`${URL}new-employee.png`)}
               />
            </div>
            <div className={css.describe}>
               {rows.map((r, i) => {
                  return (
                     <p key={i}>
                        <b>{translate(`dashboard.account-describe_${r}`)}</b>&#32;- {user[`describe_${r}`]}
                     </p>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default Account
