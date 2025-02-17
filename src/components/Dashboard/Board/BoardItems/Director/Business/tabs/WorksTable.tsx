import { COLUMNS_D, WorksTypes } from '@/constants/works'
import { useGetAllBusinessWorkByTypeQuery } from '@/store/reducers/businessApiReducer'
import React, { CSSProperties, FC, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Table } from '../components'
import AddWorkButton from '../components/AddWorkButton'
import Navigation from '../components/Navigation'
import Pagination from '../components/Pagination'
import Rows from '../components/Rows'
import css from './Tabs.module.scss'
import InDevelopment from '@/components/InDevelopment/InDevelopment'

type PageSetting = {
   currentPage: number
   count: number
}

const WorksTable: FC<{ table_type: (typeof WorksTypes)[number] }> = ({ table_type }) => {
   const scroll_rows = useRef<HTMLDivElement>(null)
   const fixed_rows = useRef<HTMLDivElement>(null)
   const { data, isLoading: isWorksLoading } = useGetAllBusinessWorkByTypeQuery(table_type)
   const [pageSetting, setPageSetting] = useState<PageSetting>({ currentPage: 1, count: 10 })
   const [all_works, setAllWorks] = useState(data)

   const works_count = useMemo(() => {
      if (all_works) {
         return all_works.length
      }
   }, [all_works])

   useEffect(() => {
      setAllWorks(data)
   }, [data])

   const scroll_row_length = useMemo(() => {
      return COLUMNS_D.SCROLL_VALUES[table_type]
         .map((v) => {
            if (typeof v !== 'object') {
               return v
            }
            const [values] = Object.values(v)
            return values
         })
         .flat(1).length
   }, [])

   const sorted_all_works = all_works
      ? [...all_works].sort((a, b) => a.name_of_vessel.localeCompare(b.name_of_vessel))
      : []

   const paginated_works = useMemo(() => {
      const startIndex = (pageSetting.currentPage - 1) * pageSetting.count
      const endIndex = startIndex + pageSetting.count
      return sorted_all_works.slice(startIndex, endIndex)
   }, [sorted_all_works, pageSetting])

   if (table_type !== 'design') return <InDevelopment />

   return (
      <div className={css.wrapper}>
         <Navigation type={table_type} />
         <AddWorkButton type={table_type} />
         <div className={css.table_fixed}>
            <div className={css.header}>
               {COLUMNS_D.FIXED_VALUES.map((c, i) => (
                  <Fragment key={i}>
                     <Table.Heading data={c} />
                  </Fragment>
               ))}
            </div>
            <div ref={fixed_rows} className={css.rows}>
               <Rows
                  {...{
                     scroll_row_length,
                     type: 'fixed',
                     all_works: paginated_works,
                     isWorksLoading,
                     table_type
                  }}
               />
               <Pagination {...{ works_count, pageSetting, setPageSetting, setAllWorks, data }} />
            </div>
         </div>
         <div className={css.table_scroll}>
            <div className={css.header} style={{ gridTemplateColumns: `repeat(${scroll_row_length}, auto)` }}>
               {COLUMNS_D.SCROLL_VALUES[table_type].map((c, i) => {
                  const options = COLUMNS_D.OPTIONS[c as string]

                  if (c === 'name_of_company_locale') return

                  return (
                     <Fragment key={i}>
                        <Table.Heading data={c} type='right' options={options as CSSProperties} />
                     </Fragment>
                  )
               })}
            </div>
            <div ref={scroll_rows} className={css.rows}>
               <Rows
                  {...{
                     scroll_row_length,
                     type: 'scroll',
                     all_works: paginated_works,
                     isWorksLoading,
                     table_type
                  }}
               />
            </div>
         </div>
      </div>
   )
}

export default WorksTable
