import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import css from './TimeNavigate.module.scss'
import { Box, TextField } from '@mui/material'
import Image from 'next/image'
import useOutsideClick from '@/hooks/useOutsideClick'
import { invalidateTags, useGetAllWorksQuery } from '@/store/reducers/businessApiReducer'
import translate from '@/i18n/translate'
import { useIntl } from 'react-intl'
import { IJobDataAction } from '../Time'
import { useAppDispatch } from '@/hooks/redux'

const input_sx = {
   '.MuiOutlinedInput-input': {
      fontSize: '14px'
   },
   '.MuiInputLabel-root': {
      fontSize: '14px',
      color: '#bababa'
   }
}

type CalcModalProps = {
   setisCalcModal: React.Dispatch<React.SetStateAction<boolean>>
   updateJobs: React.Dispatch<IJobDataAction>
   work_numbers: string[]
}

export const CalcModal: FC<CalcModalProps> = ({ setisCalcModal, updateJobs, work_numbers }) => {
   const ref = useRef(null)
   const dispatch = useAppDispatch()
   const { data: all_types_works } = useGetAllWorksQuery()
   const [currentWorkNumber, setCurrentWorkNumber] = useState(0)
   const [error, setError] = useState('')
   const mess_root = 'dashboard.timereport-job-work_'
   const intl = useIntl()
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })

   const handleWorkNumber = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '')
      setCurrentWorkNumber(value === '' ? 0 : Number(value))
   }

   const findWork = () => {
      if (all_types_works && currentWorkNumber !== 0) {
         const work = all_types_works.find((w) => w.work_number === currentWorkNumber)
         if (!work) {
            return setError(staticTranslate(`${mess_root}not_exist`))
         }
         if (work_numbers.includes(String(work.work_number))) {
            return setError(staticTranslate(`${mess_root}already_exist`))
         }
         if (work.work_status !== 'IN PROGRESS') {
            return setError(staticTranslate(`${mess_root}not_in_progress`))
         }
         setError('')
         updateJobs({
            type: 'add_calculated',
            payload: {
               project_number: String(work?.work_number),
               ship_name: work?.name_of_vessel,
               job_description: work?.name_of_work
            }
         })
         setisCalcModal(false)
      }
   }

   useEffect(() => {
      dispatch(invalidateTags([{ type: 'BusinessWork', id: 'ALL' }]))
   }, [dispatch])

   useOutsideClick(ref, () => setisCalcModal(false))

   return (
      <div ref={ref} className={css.calc_modal}>
         <button onClick={() => setisCalcModal(false)} className={css.close}>
            ×
         </button>
         <h3>{translate(`${mess_root}calc_add_title`)}</h3>
         <div className={css.inputs}>
            <Box
               component='form'
               sx={{ '& > :not(style)': { width: '220px', backgroundColor: '#fff', marginTop: '12px' } }}
               noValidate
               autoComplete='off'
            >
               <TextField
                  onChange={handleWorkNumber}
                  value={currentWorkNumber === 0 ? '' : currentWorkNumber}
                  sx={input_sx}
                  size='small'
                  id='filter'
                  label='Work number'
                  variant='outlined'
               />
            </Box>
            <button onClick={findWork} className={css.find_btn}>
               <div>
                  <Image src='/assets/images/svg/timereport-job-find.svg' fill alt='loader' />
               </div>
            </button>
            <p className={css.error}>{error}</p>
         </div>
      </div>
   )
}
