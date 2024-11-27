import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { PageSettingState } from '../tabs/Design'
import Filters from './Filters'
import css from './Table.module.scss'
import { DESIGN_WORK_PROPS } from '@/constants/works'

type PaginationProps = {
   works_count: number
   data: DESIGN_WORK_PROPS[]
   setAllWorks: React.Dispatch<React.SetStateAction<DESIGN_WORK_PROPS[]>>
} & PageSettingState

const WorksCount: FC<PageSettingState> = ({ pageSetting, setPageSetting }) => {
   const handleChange = (event: SelectChangeEvent) => {
      setPageSetting((prevState) => ({ ...prevState, count: +event.target.value }))
   }

   const multiplicity = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

   const style = {
      fontSize: '14px',
      fontFamily: ' var(--font-nunito-semibold)'
   }

   return (
      <div className={css.count_wrapper}>
         <Box>
            <FormControl fullWidth size='small'>
               <InputLabel id='demo-simple-select-label'>Count</InputLabel>
               <Select
                  style={style}
                  labelId='count'
                  id='count'
                  value={String(pageSetting.count)}
                  label='Count'
                  onChange={handleChange}
               >
                  {multiplicity.map((c) => (
                     <MenuItem key={c} value={c} style={style}>
                        {c}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>
      </div>
   )
}

const Pagination: FC<PaginationProps> = ({ works_count, pageSetting, setPageSetting, setAllWorks, data }) => {
   const maxPage = Math.ceil(works_count / pageSetting.count)

   const nextPage = () => {
      const maxPage = Math.ceil(works_count / pageSetting.count)
      setPageSetting((prevPage) => {
         const newPage = prevPage.currentPage + 1
         return newPage <= maxPage ? { ...prevPage, currentPage: newPage } : prevPage
      })
   }

   const previousPage = () => {
      setPageSetting((prevPage) => {
         const newPage = prevPage.currentPage - 1
         return newPage >= 1 ? { ...prevPage, currentPage: newPage } : prevPage
      })
   }

   const start = (pageSetting.currentPage - 1) * pageSetting.count + 1
   const end = Math.min(start + pageSetting.count - 1, works_count)

   return (
      <div className={css.pagination_wrapper}>
         <div className={css.left_block}>
            <div className={css.pagination}>
               <button onClick={previousPage} disabled={pageSetting.currentPage === 1}>
                  <Image src={'/assets/images/svg/pag-arrow-left.svg'} width={14} height={14} alt='arrow left' />
               </button>
               <p>{`${start} - ${end || 1} of ${works_count || 1}`}</p>
               <button onClick={nextPage} disabled={pageSetting.currentPage >= maxPage}>
                  <Image src={'/assets/images/svg/pag-arrow-right.svg'} width={14} height={14} alt='arrow right' />
               </button>
            </div>
            <WorksCount {...{ pageSetting, setPageSetting }} />
         </div>
         <Filters {...{ setAllWorks, data }} />
      </div>
   )
}

export default Pagination
