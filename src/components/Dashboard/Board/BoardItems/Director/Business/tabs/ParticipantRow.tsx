import { Participant, ParticipantOptions } from '@/constants/works'
import React, { FC } from 'react'
import Input from './components/Input'
import css from './ParticipantTable.module.scss'

type ParticipantRowProps = {
   participant: Participant
   rowsSettings: ParticipantOptions
   index: number
   firstColumnWidth: number
   updateParticipent: (id: string, property: Record<string, string | number | boolean>) => void
   removeParticipant: (id: string) => Promise<void>
   currentPage: number
}

const ParticipantRow: FC<ParticipantRowProps> = ({
   participant,
   updateParticipent,
   rowsSettings,
   index,
   firstColumnWidth,
   removeParticipant,
   currentPage
}) => {
   const handleUpdateParticipant = (property: string) => (value: string | number | boolean) => {
      updateParticipent(participant.id, { [property]: value })
   }

   const isDisabledList = ['IMO']

   return (
      <div className={css.row}>
         <div style={{ width: firstColumnWidth, textAlign: 'center' }}>{index + 1 + (currentPage - 1) * 10}</div>
         {rowsSettings.map((s) => {
            const [property] = Object.keys(s)
            const [, width] = s[property]

            return (
               <div className={css.item_wrapper} style={{ width }} key={property}>
                  <Input
                     disabled={isDisabledList.includes(property) && participant?.imo_frozen}
                     value={participant[property]}
                     setValue={handleUpdateParticipant(property)}
                     property={property}
                  />
                  {property === 'IMO' && (
                     <button
                        className={css.frozen}
                        onClick={() => handleUpdateParticipant('imo_frozen')(!participant.imo_frozen)}
                        style={{
                           backgroundImage: `url(/assets/images/svg/dashboard-${
                              !participant?.imo_frozen ? 'un' : ''
                           }lock.svg)`
                        }}
                     />
                  )}
               </div>
            )
         })}
         <button onClick={() => removeParticipant(participant.id)} className={css.remove}>
            ✖
         </button>
      </div>
   )
}

export default ParticipantRow
