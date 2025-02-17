import Image from 'next/image'
import React, { CSSProperties, FC, memo } from 'react'
import css from '../ParticipantTable.module.scss'

type ParticipantsHeadingProps = {
   isLoading: boolean
   actions: (type: string) => void | Promise<void>
}

const MENU = ['add_item', 'save_items']

const ParticipantsMenu: FC<ParticipantsHeadingProps> = ({ isLoading, actions }) => {
   return (
      <div className={css.menu}>
         {MENU.map((b) => (
            <button
               onClick={() => actions(b)}
               key={b}
               style={{ '--btn-bg': ` url(/assets/images/svg/dashboard.business-${b}.svg)` } as CSSProperties}
               disabled={isLoading}
            />
         ))}
         {isLoading ? (
            <Image
               src='/assets/images/svg/simple-loader.svg'
               alt='loader'
               width={20}
               height={20}
               style={{ marginLeft: '10px' }}
            />
         ) : null}
      </div>
   )
}

export default memo(ParticipantsMenu)
