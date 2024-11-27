import { COLORS, DESIGN_WORK_PROPS, WorkStatusType } from '@/constants/works'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { FC, memo, useEffect, useState } from 'react'
import css from './Table.module.scss'
import { WorksStateType } from './Row'

type DropdownProps = Partial<{
   wt: keyof DESIGN_WORK_PROPS
   options: string[]
   value?: string
}> &
   WorksStateType &
   React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const getStyles = (status: string, isDisabled?: boolean) => {
   const template = (color: string[]) => {
      return {
         select: {
            color: color[1],
            backgroundColor: isDisabled ? '#fff' : color[0],
            textAlign: 'center',
            svg: {
               display: isDisabled ? 'none' : 'auto'
            }
         },
         option: {
            '&:hover': {
               color: color[1],
               backgroundColor: color[0]
            },
            '&.Mui-selected': {
               borderColor: 'red',
               backgroundColor: '#fff',
               '&:hover': {
                  color: color[1],
                  backgroundColor: color[0]
               }
            }
         }
      }
   }

   const { green, red, yellow, sky, hover, white } = COLORS

   switch (status) {
      case 'DONE':
      case 'USD':
         return template(green)
      case 'UNDER REVIEW':
      case 'EUR':
      case 'INTERNAL':
         return template(sky)
      case 'CANCEL':
      case 'EXTERNAL':
         return template(red)
      case 'IN PROGRESS':
      case 'UAH':
         return template(yellow)
      case 'PLANNED':
         return template(hover)
      default:
         return template(white)
   }
}

const Dropdown: FC<DropdownProps> = ({ wt, options = [], value, setLocalWorks, localWorks, ...rest }) => {
   const [dropdownData, setDropdownData] = useState(value || localWorks[wt])

   const styles = {
      width: wt === 'name_of_vessel' ? '195px' : '110px'
   }

   const formControl_styles = {
      '.MuiInputBase-root': {
         width: styles.width,
         borderRadius: '6px',
         ...rest.style,
         '.MuiSelect-select': {
            padding: '5px 24px 5px 12px',
            fontSize: '12px'
         }
      }
   }

   const handleChange = (event: SelectChangeEvent) => {
      setDropdownData(event.target.value)
   }

   useEffect(() => {
      const correct_wt = wt === 'name_of_company' ? 'name_of_company_locale' : wt
      setLocalWorks((prevState) => {
         return { ...prevState, [correct_wt]: dropdownData }
      })
   }, [dropdownData])

   useEffect(() => {
      if (localWorks[wt] || value) {
         setDropdownData(value || localWorks[wt])
      }
   }, [localWorks[wt], value])

   return (
      <div className={css.dropdown}>
         <FormControl size='small' sx={formControl_styles}>
            <Select value={dropdownData} onChange={handleChange} sx={getStyles(dropdownData as WorkStatusType).select}>
               {options.map((i, index) => {
                  const styles = {
                     fontSize: '12px',
                     ...getStyles(i as WorkStatusType).option
                  }

                  return (
                     <MenuItem key={index} sx={styles} value={i}>
                        {i}
                     </MenuItem>
                  )
               })}
            </Select>
         </FormControl>
      </div>
   )
}

export default memo(Dropdown)
