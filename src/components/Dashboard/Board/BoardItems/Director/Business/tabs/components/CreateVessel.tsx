import PortalModal from '@/components/UI/modals/PortalModal'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import css from './CreateVessel.module.scss'
import { findDuplicatesBeforeCreate, getFieldTitle } from './services'
import { useCreateVesselMutation } from '@/store/reducers/businessApiReducer'
import { BaseQueryFn, QueryActionCreatorResult, QueryDefinition } from '@reduxjs/toolkit/query'
import { Vessel } from '@/constants/works'
import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'

type CreateVesselProps = {
   refetch: () => QueryActionCreatorResult<QueryDefinition<void, BaseQueryFn, never, Vessel[], 'businessApi'>>
   fields: string[]
   setisCreateModal: React.Dispatch<React.SetStateAction<boolean>>
   vessels: Vessel[]
}

const CreateVessel: FC<CreateVesselProps> = ({ setisCreateModal, fields, refetch, vessels }) => {
   const [newVesselData, setNewVesselData] = useState({ IMO: 0, name_of_vessel: '', imo_frozen: false })
   const [error, setError] = useState('')
   const [createVessel, { isLoading, isSuccess, isError }] = useCreateVesselMutation()

   useSnackbarVariant({
      isError,
      isSuccess,
      successMessage: 'business.messages-011',
      errorMessage: 'business.messages-012'
   })

   const apply = async () => {
      if (!newVesselData['IMO'] || !newVesselData['name_of_vessel']) {
         return setError('The IMO and Name of vessel fields must not be empty!')
      }
      const check = findDuplicatesBeforeCreate(vessels, newVesselData['IMO'], setError)
      if (check) {
         setError('')
         await createVessel(newVesselData)
      }
   }

   const refresh = async () => {
      await refetch()
   }

   useEffect(() => {
      if (isSuccess) {
         refresh()
         setisCreateModal(false)
      }
   }, [isSuccess])

   const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, type: string) => {
      if (type === 'IMO') {
         const isNumber = /^\d+(\.\d*)?$/.test(e.target.value)
         if (!isNumber) {
            return
         }
      }
      setNewVesselData((prevValue) => {
         const value = type === 'IMO' ? Number(e.target.value) : e.target.value
         const newValue = { ...prevValue, [type]: value }
         return newValue
      })
   }

   const handleChangeIMOFrozen = () => {
      setNewVesselData((prevValue) => {
         const newValue = { ...prevValue, imo_frozen: !prevValue['imo_frozen'] }
         return newValue
      })
   }

   const lock_style = {
      transform: `translateX(${newVesselData['imo_frozen'] ? 30 : 0}px)`
   }

   return (
      <PortalModal>
         <div className={css.wrapper}>
            <h3>Create vessel</h3>
            {fields.map((f: string) => {
               return (
                  <div className={css.input} key={f}>
                     <label>{getFieldTitle(f)}</label>
                     {f !== 'imo_frozen' ? (
                        <input
                           value={newVesselData[f]}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeValue(e, f)}
                        />
                     ) : (
                        <button onClick={handleChangeIMOFrozen} className={css.check} disabled={isLoading}>
                           <span style={{ ...lock_style, opacity: newVesselData['imo_frozen'] ? 0 : 1 }} />
                           <span style={{ ...lock_style, opacity: newVesselData['imo_frozen'] ? 1 : 0 }} />
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

export default CreateVessel
