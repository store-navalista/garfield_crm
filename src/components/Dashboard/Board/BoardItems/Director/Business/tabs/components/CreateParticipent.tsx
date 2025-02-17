import PortalModal from '@/components/UI/modals/PortalModal'
import { new_participants, Participant, ParticipantTypes } from '@/constants/works'
import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'
import { useCreateParticipantMutation } from '@/store/reducers/participantApiReducer'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import css from './CreateParticipent.module.scss'
import { extractMessageBeforeView, getFieldTitle } from './services'

type CreateVesselProps = {
   fields: string[]
   setisCreateModal: React.Dispatch<React.SetStateAction<boolean>>
   participants: Participant[]
   type: ParticipantTypes
}

const CreateParticipent: FC<CreateVesselProps> = ({ type, setisCreateModal, fields }) => {
   const [newParticipentData, setNewParticipentData] = useState(new_participants[type])
   const [error, setError] = useState('')
   const [createParticipent, { isLoading, isSuccess, isError, error: createError }] = useCreateParticipantMutation()

   useSnackbarVariant({
      isError,
      isSuccess,
      successMessage: 'business.messages-011',
      errorMessage: 'business.messages-012'
   })

   const apply = async () => {
      switch (type) {
         case 'executor': {
            if (!newParticipentData['executor_name']) {
               return setError('The Executor Name field must not be empty!')
            }
            break
         }
         case 'contractor': {
            if (!newParticipentData['contractor_name']) {
               return setError('The Contractor Name field must not be empty!')
            }
            break
         }
         default: {
            if (!newParticipentData['IMO'] || !newParticipentData['name_of_vessel']) {
               return setError('The IMO and Name of vessel fields must not be empty!')
            }
         }
      }

      setError('')
      await createParticipent({ type, createParticipantData: newParticipentData })
   }

   useEffect(() => {
      if (isSuccess) {
         setisCreateModal(false)
      }
   }, [isSuccess])

   useEffect(() => {
      if (createError) {
         setError(extractMessageBeforeView(createError['message']))
      }
   }, [createError])

   const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, type: string) => {
      if (type === 'IMO') {
         const isNumber = /^\d+(\.\d*)?$/.test(e.target.value)
         if (!isNumber) {
            return
         }
      }
      setNewParticipentData((prevValue) => {
         const value = type === 'IMO' ? Number(e.target.value) : e.target.value
         const newValue = { ...prevValue, [type]: value }
         return newValue
      })
   }

   const handleChangeIMOFrozen = () => {
      setNewParticipentData((prevValue) => {
         const newValue = { ...prevValue, imo_frozen: !prevValue['imo_frozen'] }
         return newValue
      })
   }

   const lock_style = {
      transform: `translateX(${newParticipentData['imo_frozen'] ? 30 : 0}px)`
   }

   return (
      <PortalModal>
         <div className={css.wrapper}>
            <h3>Create {type}</h3>
            {fields.map((f: string) => {
               return (
                  <div className={css.input} key={f}>
                     <label>{getFieldTitle(f)}</label>
                     {f !== 'imo_frozen' ? (
                        <input
                           value={newParticipentData[f]}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeValue(e, f)}
                        />
                     ) : (
                        <button onClick={handleChangeIMOFrozen} className={css.check} disabled={isLoading}>
                           <span style={{ ...lock_style, opacity: newParticipentData['imo_frozen'] ? 0 : 1 }} />
                           <span style={{ ...lock_style, opacity: newParticipentData['imo_frozen'] ? 1 : 0 }} />
                        </button>
                     )}
                  </div>
               )
            })}
            <div className={css.buttons}>
               <button onClick={apply} disabled={isLoading}>
                  <span style={{ opacity: isLoading ? 1 : 0 }} />
                  {isLoading ? '' : 'Ok'}
               </button>
               <button onClick={() => setisCreateModal(false)} disabled={isLoading}>
                  Cancel
               </button>
            </div>
            {error ? <div className={css.error}>{error}</div> : null}
         </div>
      </PortalModal>
   )
}

export default CreateParticipent
