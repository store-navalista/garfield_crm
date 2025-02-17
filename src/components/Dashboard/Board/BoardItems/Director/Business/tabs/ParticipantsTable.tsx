import {
   participants as list,
   new_participants,
   Participant,
   participantsRows,
   ParticipantTypes
} from '@/constants/works'
import { useSnackbarVariant } from '@/hooks/useSnackbarVariant'
import {
   useDeleteParticipantMutation,
   useGetParticipantsByTypeQuery,
   useUpdateParticipantsMutation
} from '@/store/reducers/participantApiReducer'
import React, { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import ParticipantRow from './ParticipantRow'
import css from './ParticipantTable.module.scss'
import CreateParticipent from './components/CreateParticipent'
import ParticipantsHeading from './components/ParticipantsHeading'
import ParticipantsMenu from './components/ParticipantsMenu'
import ParticipationsPagination from './components/ParticipationsPagination'
import { extractMessageBeforeView } from './components/services'

const modifiedVessels = (participants: Participant[], currentPage: number) => {
   const startIndex = (currentPage - 1) * 10
   const endIndex = startIndex + 10

   return participants.slice(startIndex, endIndex)
}

type ParticipantProps = {
   type: ParticipantTypes
   setCurrentParticipant: React.Dispatch<React.SetStateAction<ParticipantTypes>>
}

const ParticipantsTable: FC<ParticipantProps> = ({ type, setCurrentParticipant }) => {
   const { data } = useGetParticipantsByTypeQuery({ type })
   const [participants, updateParticipants] = useState(data || [])
   const [
      fetchUpdatedParticipants,
      { isLoading: isUpdateLoading, isError: updateIsError, error: updateError, isSuccess: updateIsSuccess }
   ] = useUpdateParticipantsMutation()
   const [deleteParticipant, { isLoading: isDeleteLoading, isError: deleteIsError, isSuccess: deleteIsSuccess }] =
      useDeleteParticipantMutation()
   const [isCreateModal, setisCreateModal] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [isLoading, setisLoading] = useState(false)

   useEffect(() => {
      if (isUpdateLoading || isDeleteLoading) {
         setisLoading(true)
      } else {
         setisLoading(false)
      }
   }, [isUpdateLoading, isDeleteLoading])

   const pages_count = useMemo(() => {
      return Math.ceil(data?.length / 10)
   }, [participants])

   useSnackbarVariant({
      isError: updateIsError,
      isSuccess: updateIsSuccess,
      successMessage: 'business.messages-013',
      errorMessage: updateError && extractMessageBeforeView(updateError['message'])
   })

   useSnackbarVariant({
      isError: deleteIsError,
      isSuccess: deleteIsSuccess,
      successMessage: 'business.messages-015',
      errorMessage: 'business.messages-016'
   })

   const actions = (type: string) => {
      switch (type) {
         case 'add_item':
            return setisCreateModal(true)
         case 'save_items':
            return (async () => await saveParticipant())()
         default:
            return
      }
   }

   const removeParticipant = useCallback(
      async (id: string) => {
         const apply = confirm('Are you sure you want to delete this vessel?')
         if (!apply) return
         await deleteParticipant({ type, id })
      },
      [type]
   )

   const saveParticipant = async () => {
      await fetchUpdatedParticipants({ type, updateParticipantsData: participants })
   }

   useEffect(() => {
      if (data) {
         updateParticipants(modifiedVessels(data, currentPage))
      }
   }, [data, currentPage])

   useEffect(() => {
      if (deleteIsSuccess && currentPage > pages_count) {
         setCurrentPage((prev) => Math.max(1, prev - 1))
      }
   }, [deleteIsSuccess, currentPage, pages_count])

   const rowsSettings = participantsRows[type]
   const newParticipantFields = Object.keys(new_participants[type])

   const firstColumnWidth = 40

   const updateParticipent = useCallback((id: string, property: Record<string, string | number | boolean>) => {
      updateParticipants((prevState) => {
         return prevState.map((participant) => (participant.id === id ? { ...participant, ...property } : participant))
      })
   }, [])

   return (
      <div className={css.wrapper}>
         <div className={css.tabs}>
            {list.map((part_type) => {
               return (
                  <button
                     data-type={part_type === type ? 'true' : 'false'}
                     key={part_type}
                     onClick={() => {
                        setCurrentPage(1)
                        setCurrentParticipant(part_type)
                     }}
                     className={css.tab_btn}
                  >
                     {part_type + 's'}
                  </button>
               )
            })}
         </div>
         <div className={css.table}>
            {data?.length > 10 ? <ParticipationsPagination {...{ pages_count, currentPage, setCurrentPage }} /> : null}
            <h3>{type + 's'}</h3>
            <div className={css.rows}>
               <ParticipantsHeading {...{ rowsSettings, width: firstColumnWidth }} />
               {participants &&
                  participants.map((participant, index) => {
                     const props = {
                        participant,
                        updateParticipent,
                        rowsSettings,
                        index,
                        firstColumnWidth,
                        removeParticipant,
                        currentPage
                     }

                     return (
                        <Fragment key={index}>
                           <ParticipantRow {...props} />
                        </Fragment>
                     )
                  })}
               {!participants.length ? <div className={css.no_row} /> : null}
            </div>
            <ParticipantsMenu {...{ isLoading, actions }} />
         </div>
         {isCreateModal ? (
            <CreateParticipent {...{ participants, type, setisCreateModal, fields: newParticipantFields }} />
         ) : null}
      </div>
   )
}

export default ParticipantsTable
