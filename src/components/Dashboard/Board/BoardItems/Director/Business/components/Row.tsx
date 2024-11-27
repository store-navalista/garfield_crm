import { COLUMNS_D, DESIGN_WORK_PROPS, DROPDOWN_OPTIONS } from '@/constants/works'
import { useAppDispatch } from '@/hooks/redux'
import { BusinessActions } from '@/store/reducers/businessReducer'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { Table } from '.'
import css from '../tabs/Tabs.module.scss'
import DeleteButton from './DeleteButton'
import ValueTemplate from './ValueTemplate'

export interface RowProps {
   id: DESIGN_WORK_PROPS['id']
   type?: 'fixed' | 'scroll'
   row_index: number
   scroll_row_length: number
   work: DESIGN_WORK_PROPS
}

export type WTType = keyof DESIGN_WORK_PROPS

export type WorksStateType = {
   localWorks: DESIGN_WORK_PROPS
   setLocalWorks: React.Dispatch<React.SetStateAction<Partial<DESIGN_WORK_PROPS>>>
}

const Row: FC<RowProps> = ({ id, type, row_index, scroll_row_length, work }) => {
   const [localWorks, setLocalWorks] = useState(work)
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (localWorks) {
         dispatch(BusinessActions.setBusinessData({ work: localWorks, table_type: type }))
      }
   }, [localWorks])

   useEffect(() => {
      if (work) {
         setLocalWorks(work)
      }
   }, [work])

   const works_types = type === 'fixed' ? COLUMNS_D.FIXED_VALUES : COLUMNS_D.SCROLL_VALUES

   useEffect(() => {
      if (['PLANNED', 'CANCEL'].includes(localWorks.work_status)) {
         setLocalWorks((prevState) => ({
            ...prevState,
            start_of_work: '',
            end_of_work: ''
         }))
      }

      if (['IN PROGRESS', 'UNDER REVIEW'].includes(localWorks.work_status)) {
         setLocalWorks((prevState) => ({
            ...prevState,
            end_of_work: ''
         }))
      }
   }, [localWorks.work_status])

   return (
      <div
         key={row_index}
         className={css.row}
         style={{
            gridTemplateColumns: type === 'scroll' ? `repeat(${scroll_row_length}, auto)` : 'repeat(2, 90px 200px)'
         }}
      >
         {type === 'fixed' ? <DeleteButton id={work.id} /> : null}
         {works_types.map((wt, index: number) => {
            if (wt === 'name_of_company_locale') return
            if (wt === 'name_of_company') {
               return (
                  <div key={index} className={css.input_wrapper} style={{ width: '220px' }}>
                     <Table.Input
                        {...{
                           wt,
                           value: localWorks['name_of_company'] as string | number,
                           onChangeHandle: setLocalWorks
                        }}
                     />
                     <Table.Dropdown
                        {...{
                           wt,
                           value: localWorks['name_of_company_locale'],
                           options: DROPDOWN_OPTIONS.work_location,
                           localWorks,
                           setLocalWorks
                        }}
                        style={{ width: '52px', marginLeft: '8px' }}
                     />
                  </div>
               )
            }

            if (typeof wt !== 'object') {
               const options = COLUMNS_D.OPTIONS[wt]
               return (
                  <Fragment key={index}>
                     <ValueTemplate {...{ id, index, wt: wt as WTType, options, localWorks, setLocalWorks }} />
                  </Fragment>
               )
            }
            const [values] = Object.values(wt)

            return (values as string[]).map((wt, index) => {
               const options = COLUMNS_D.OPTIONS[wt]

               return (
                  <Fragment key={index}>
                     <ValueTemplate {...{ index, wt: wt as WTType, options, localWorks, setLocalWorks }} />
                  </Fragment>
               )
            })
         })}
      </div>
   )
}

export default Row
