import { DESIGN_WORK_PROPS } from '@/constants/works'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useFilterByMutation } from '@/store/reducers/businessApiReducer'
import { BusinessActions } from '@/store/reducers/businessReducer'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import Image from 'next/image'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import css from './Table.module.scss'

type FilterProps = {
   data: DESIGN_WORK_PROPS[]
   setAllWorks: React.Dispatch<React.SetStateAction<DESIGN_WORK_PROPS[]>>
}

type QueryFilterType = {
   id: string
   value: string
}

type FilterTypeProps = {
   filter: QueryFilterType
   setFilter: Dispatch<SetStateAction<QueryFilterType>>
   filter_types: Record<string, string>[]
}

const FilterButton: FC<FilterProps & { filter: QueryFilterType }> = ({ setAllWorks, data, filter }) => {
   const [getFilteredWorks, { data: filteredWorks, isSuccess }] = useFilterByMutation()
   const isFiltered = useAppSelector((state) => state.reducer.business.isFiltered)
   const dispatch = useAppDispatch()

   const find = async () => {
      dispatch(BusinessActions.setisFiltered(!isFiltered))
      if (!filter.value) return
      await getFilteredWorks({ type: 'design', parameter: filter.id, value: filter.value })
   }

   useEffect(() => {
      if (isSuccess && isFiltered) {
         setAllWorks(filteredWorks)
      } else {
         setAllWorks(data)
      }
   }, [isSuccess])

   return (
      <button className={css.filter_button} onClick={find}>
         <Image
            src={`/assets/images/svg/${isFiltered ? 'dashboard-filter_disable.svg' : 'dashboard-filter.svg'}`}
            style={{ transform: 'translate(-2px, 2px' }}
            width={18}
            height={18}
            alt='loader'
         />
      </button>
   )
}

const FilterType: FC<FilterTypeProps> = ({ filter_types, filter, setFilter }) => {
   const handleChange = (event: SelectChangeEvent) => {
      setFilter((prevState) => ({ ...prevState, id: event.target.value as string }))
   }

   const style = {
      fontSize: '14px',
      fontFamily: ' var(--font-nunito-semibold)'
   }

   return (
      <Box sx={{ width: '140px', marginRight: '8px' }}>
         <FormControl fullWidth size='small'>
            <InputLabel id='demo-simple-select-label'>Filter type</InputLabel>
            <Select
               style={style}
               labelId='count'
               id='count'
               value={filter['id']}
               label='Filter type'
               onChange={handleChange}
            >
               {filter_types.map((c) => (
                  <MenuItem key={c.title} value={c.id} style={style}>
                     {c.title}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   )
}

const Filters: FC<FilterProps> = ({ setAllWorks, data }) => {
   const filter_types = [
      { title: 'Work Number', id: 'work_number' },
      { title: 'Name of Vessel', id: 'name_of_vessel' },
      { title: 'Name of Work', id: 'name_of_work' }
   ]

   const [filter, setFilter] = useState({ id: filter_types[0].id, value: '' })

   const sx = {
      '.MuiOutlinedInput-input': {
         fontSize: '14px'
      },
      '.MuiInputLabel-root': {
         fontSize: '14px'
      }
   }

   const handleValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFilter((prevState) => ({ ...prevState, value: event.target.value as string }))
   }

   return (
      <div className={css.filter_wrapper}>
         <div>
            <FilterButton {...{ setAllWorks, data, filter }} />
            <Box component='form' sx={{ '& > :not(style)': { m: 1, width: '200px' } }} noValidate autoComplete='off'>
               <TextField onChange={handleValue} sx={sx} size='small' id='filter' label='Filter' variant='outlined' />
            </Box>
         </div>
         <FilterType {...{ filter_types, filter, setFilter }} />
      </div>
   )
}

export default Filters
