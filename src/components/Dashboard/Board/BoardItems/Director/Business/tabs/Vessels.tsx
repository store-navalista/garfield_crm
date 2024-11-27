import { Vessel } from '@/constants/works'
import {
   useDeleteVesselMutation,
   useGetVesselsQuery,
   useUpdateVesselsMutation
} from '@/store/reducers/businessApiReducer'
import Image from 'next/image'
import React, { CSSProperties, FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import css from './Vessels.module.scss'
import CreateVessel from './components/CreateVessel'
import VesselValues from './components/VesselInput'
import VesselPagination from './components/VesselPagination'
import { findDuplicates, getFieldTitle } from './components/services'
import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'

type ValuesProps = {
   index: number
   type: (typeof fields)[number]
   value: string | boolean | number
   imo_frozen?: boolean
}

export type ChangeValuesProps = ValuesProps & {
   handleChangeValues(values: ValuesProps): void
}

const modifiedVessels = (vessels: Vessel[], currentPage: number) => {
   const startIndex = (currentPage - 1) * 10
   const endIndex = startIndex + 10

   const vessels_pag = vessels.map((v, i) => {
      return { ID: i + 1, IMO: v.IMO, name_of_vessel: v.name_of_vessel, imo_frozen: v.imo_frozen }
   })

   return vessels_pag.slice(startIndex, endIndex)
}

const MENU = ['add_vessel', 'save_vessels']
const fields = ['ID', 'IMO', 'name_of_vessel']

export type FieldsType = (typeof fields)[number]

const Vessels: FC = () => {
   const [vessels, setVessels] = useState<Vessel[]>([])
   const [error, setError] = useState('')
   const [createVessels, { isLoading, isError: updateIsError, isSuccess: updateIsSuccess }] = useUpdateVesselsMutation()
   const [deleteVessel, { isLoading: deleteProccess, isError: deleteIsError, isSuccess: deleteIsSuccess }] =
      useDeleteVesselMutation()
   const { data, refetch } = useGetVesselsQuery()
   const [currentPage, setCurrentPage] = useState(1)
   const [isCreateModal, setisCreateModal] = useState(false)

   const pages_count = useMemo(() => {
      return Math.ceil(data?.length / 10)
   }, [vessels])

   useSnackbarVariant({
      isError: updateIsError,
      isSuccess: updateIsSuccess,
      successMessage: 'business.messages-011',
      errorMessage: 'business.messages-012'
   })

   useSnackbarVariant({
      isError: deleteIsError,
      isSuccess: deleteIsSuccess,
      successMessage: 'business.messages-015',
      errorMessage: 'business.messages-016'
   })

   const actions = (type: (typeof MENU)[number]) => {
      switch (type) {
         case 'add_vessel':
            return setisCreateModal(true)
         case 'save_vessels':
            return (async () => {
               const check = findDuplicates(vessels, setError)
               if (check) {
                  setError('')
                  const withoutIDVessels = vessels.map((v) => ({
                     IMO: v.IMO,
                     imo_frozen: v.imo_frozen,
                     name_of_vessel: v.name_of_vessel
                  }))

                  await createVessels(withoutIDVessels)
               }
            })()
         default:
            return
      }
   }

   const handleChangeValues = useCallback(
      ({ index, type, value }: ValuesProps) => {
         setVessels((prevVessels) => {
            const updatedVessels = [...prevVessels]
            updatedVessels[index] = { ...updatedVessels[index], [type]: value }
            return updatedVessels
         })
      },
      [vessels]
   )

   const removeVessel = async (IMO: number) => {
      const apply = confirm('Are you sure you want to delete this vessel?')
      if (!apply) return
      await deleteVessel({ IMO })
      await refetch()
   }

   useEffect(() => {
      if (data?.length) {
         setVessels(modifiedVessels(data, currentPage))
      }
   }, [data, currentPage])

   const create_vessel_fields = [...fields.filter((f) => f !== 'ID'), 'imo_frozen']

   return (
      <div className={css.wrapper}>
         <div className={css.table}>
            {data?.length > 10 ? <VesselPagination {...{ pages_count, currentPage, setCurrentPage }} /> : null}
            <h3>Vessels</h3>
            <div className={css.rows}>
               <div className={css.row}>
                  {fields.map((f) => (
                     <span key={f} className={css.heading}>
                        {getFieldTitle(f)}
                     </span>
                  ))}
               </div>
               {vessels.map((v, index) => {
                  const { imo_frozen } = v

                  return (
                     <div className={css.row} key={index}>
                        <button onClick={() => removeVessel(v.IMO as number)} className={css.remove} />
                        {fields.map((field) => (
                           <Fragment key={`${field}-${index}`}>
                              <VesselValues
                                 {...{ index, type: field, value: `${v[field]}`, imo_frozen, handleChangeValues }}
                              />
                           </Fragment>
                        ))}
                     </div>
                  )
               })}
               {!vessels.length ? <div className={css.no_row} /> : null}
            </div>
            <div className={css.menu}>
               {MENU.map((b) => (
                  <button
                     onClick={() => actions(b)}
                     key={b}
                     style={{ '--btn-bg': ` url(/assets/images/svg/dashboard.business-${b}.svg)` } as CSSProperties}
                     disabled={isLoading}
                  />
               ))}
               {isLoading || deleteProccess ? (
                  <Image
                     src='/assets/images/svg/simple-loader.svg'
                     alt='loader'
                     width={20}
                     height={20}
                     style={{ marginLeft: '10px' }}
                  />
               ) : null}
            </div>
            {error ? (
               <div className={css.error}>
                  <p>{error}</p>
               </div>
            ) : null}
         </div>
         {isCreateModal ? (
            <CreateVessel {...{ vessels, setisCreateModal, fields: create_vessel_fields, refetch }} />
         ) : null}
      </div>
   )
}

export default Vessels
