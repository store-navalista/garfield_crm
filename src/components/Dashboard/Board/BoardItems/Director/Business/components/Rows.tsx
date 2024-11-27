import Loader from '@/components/UI/loader/Loader'
import { DESIGN_WORK_PROPS } from '@/constants/works'
import { useAppDispatch } from '@/hooks/redux'
import { BusinessActions } from '@/store/reducers/businessReducer'
import React, { FC, Fragment, memo, useEffect } from 'react'
import Row from './Row'

type RowsProps = {
   scroll_row_length: number
   type: 'scroll' | 'fixed'
   all_works: DESIGN_WORK_PROPS[]
   isWorksLoading: boolean
}

const Rows: FC<RowsProps> = ({ scroll_row_length, type, all_works, isWorksLoading }) => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (all_works) {
         dispatch(BusinessActions.setAllBusinessWorks(all_works))
      }
   }, [all_works])

   if (isWorksLoading) return <Loader />

   return all_works.map((work, index) => {
      return (
         <Fragment key={index}>
            <Row
               {...{
                  id: work.id,
                  row_index: index,
                  type,
                  scroll_row_length,
                  work
               }}
            />
         </Fragment>
      )
   })
}

export default memo(Rows)
