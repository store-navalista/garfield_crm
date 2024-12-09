import Loader from '@/components/UI/loader/Loader'
import { IUser } from '@/constants/users'
import useMenu from '@/hooks/useMenu'
import useUserByID from '@/hooks/useUserByID'
import translate from '@/i18n/translate'
import Image from 'next/image'
import React, { FC, Fragment, useEffect, useState } from 'react'
import css from './Greating.module.scss'
import GreatingButton from './GreatingButton'
import { useMediaQuery } from 'react-responsive'
import { useBackupDBMutation } from '@/store/reducers/fileApiReducer'

const Greating: FC = () => {
   const { data: user = {} as IUser } = useUserByID()
   const { describe_name } = user
   const nav = useMenu(user, { exclude: ['greating'] })
   const mobileNav = useMenu(user, { include: ['radio', 'logout', 'video'] })
   const W700 = useMediaQuery({ query: '(max-width: 700px)' })
   const [menu, setMenu] = useState([])

   useEffect(() => {
      W700 ? setMenu(mobileNav) : setMenu(nav)
   }, [W700, user])

   const [backupDB, { isLoading: backUpLoading }] = useBackupDBMutation()

   if (!user) return <Loader />

   return (
      <div className={css.greating}>
         {user.describe_role === 'Moderator' ? (
            <button className={css.backup} onClick={async () => backupDB()} disabled={backUpLoading}>
               {backUpLoading ? 'loading...' : 'Database backup'}
            </button>
         ) : null}
         <div>
            {!W700 ? (
               <>
                  <Image
                     className={css.image}
                     src='/assets/images/dashboard/greating/great.jpg'
                     alt='Greating'
                     width={400}
                     height={400}
                  />
                  <p className={css.hello}>
                     {`${describe_name} `}
                     {translate('dashboard.users-welcome')}
                  </p>
               </>
            ) : null}
            {menu.map((b, i) => {
               return (
                  <Fragment key={b.id}>
                     <GreatingButton b={b} i={i} />
                  </Fragment>
               )
            })}
         </div>
      </div>
   )
}

export default Greating
