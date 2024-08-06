import Loader from '@/components/UI/loader/Loader'
import { IUser } from '@/constants/users'
import useMenu from '@/hooks/useMenu'
import useUserByID from '@/hooks/useUserByID'
import translate from '@/i18n/translate'
import Image from 'next/image'
import React, { FC, Fragment } from 'react'
import css from './Greating.module.scss'
import GreatingButton from './GreatingButton'

const Greating: FC = () => {
   const { data: user = {} as IUser } = useUserByID()
   const { describe_name } = user
   const nav = useMenu(user, { exclude: 'greating' })

   if (!user) return <Loader />

   return (
      <div className={css.greating}>
         <div>
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
            {nav.map((b, i) => {
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
