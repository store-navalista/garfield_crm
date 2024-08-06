import React, { FC, useEffect, useMemo, useRef } from 'react'
import css from '../Timing.module.scss'
import translate from '@/i18n/translate'
import { COMMON_CELL } from '@/constants/dashboard'

type FiltersType = 'project_number' | 'ship_name' | 'job_description'

interface IFiltersProps {
   filters: Set<string>[]
   activeFilter: Record<FiltersType, string>
   setActiveFilter: React.Dispatch<React.SetStateAction<{ [key in FiltersType]: string } | null>>
}

const cells: FiltersType[] = ['project_number', 'ship_name', 'job_description']

const Filters: FC<IFiltersProps> = ({ filters, activeFilter, setActiveFilter }) => {
   const selectsRef = useRef(null)
   const isCommonFilter = useMemo(() => activeFilter?.project_number === COMMON_CELL, [activeFilter])

   const filterHandler = (e: any, c: FiltersType) => {
      setActiveFilter(null)
      if (e === COMMON_CELL) {
         setActiveFilter((prevFilters) => {
            if (activeFilter?.project_number === COMMON_CELL) {
               return null
            }

            return { [c]: e } as typeof prevFilters
         })

         return
      }
      setActiveFilter((prevFilters) => {
         const newFilter: { [key in FiltersType]: string } = {
            ...prevFilters,
            [c]: e.target.value
         }

         if (e.target[0]['value'] === e.target.value) {
            delete newFilter[c]
         }

         return Object.values(newFilter).length ? newFilter : null
      })
   }

   // useEffect(()=> {

   // },[])

   return (
      <div ref={selectsRef} className={css.filter}>
         {cells.map((c, i) => {
            const filter = Array.from(filters[i])

            return (
               <div key={c}>
                  <span>{translate(`dashboard.timereport-job-${c}`)}</span>
                  <select onChange={(e) => filterHandler(e, c)}>
                     <option>{translate('dashboard.timereport-director-timing-filterall')}</option>
                     {filter.map((f, i) => (
                        <option key={i}>{f}</option>
                     ))}
                  </select>
               </div>
            )
         })}
         <div>
            <span>{translate('dashboard.timereport-job-common-tasks')}</span>
            <button
               onClick={() => filterHandler(COMMON_CELL, 'project_number')}
               className={css.common_filter + `${isCommonFilter ? ' ' + css.turned_on : ''}`}
            >
               {translate(`dashboard.timereport-workedtime-tooltip-common-turn-${isCommonFilter ? 'off' : 'on'}`)}
            </button>
         </div>
      </div>
   )
}

export default Filters
