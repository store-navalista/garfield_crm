import React, { FC } from 'react'
import css from '../ParticipantTable.module.scss'
import { ParticipantOptions } from '@/constants/works'

type ParticipantsHeadingProps = {
   width: number
   rowsSettings: ParticipantOptions
}

const ParticipantsHeading: FC<ParticipantsHeadingProps> = ({ rowsSettings, width }) => {
   return (
      <div className={css.row}>
         <div className={css.heading} style={{ width }}>
            №
         </div>
         {rowsSettings.map((r) => {
            const [label, width] = Object.values(r)[0]

            return (
               <div key={label} className={css.heading} style={{ width }}>
                  {label}
               </div>
            )
         })}
      </div>
   )
}

export default ParticipantsHeading
