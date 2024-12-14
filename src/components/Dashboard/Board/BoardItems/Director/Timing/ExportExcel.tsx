import { radio_options, TimeReportItemType, TimeReportType, times } from '@/constants/times'
import { IUser } from '@/constants/users'
import translate from '@/i18n/translate'
import { FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { exportToExcelByPeriod } from './excel_data_period'
import { CalculateServ } from './services'
import { FilterType } from './Timing'
import css from './Timing.module.scss'
import { exportToExcelByEmployees } from './excel_data_employees'
import TimeService from '../../Time/services'

interface ExportExcelProps {
   users: IUser[]
   currentDate: Date
   filter: FilterType
}

const sx = {
   '.MuiFormControlLabel-label': {
      fontSize: '12px'
   },
   '& .MuiRadio-colorPrimary': {
      padding: '4px',
      color: 'var(--main-blue)'
   },
   '.Mui-checked': {
      color: 'var(--main-blue) !important'
   }
}

export const ExportExcel: FC<ExportExcelProps> = ({ users, currentDate, filter }) => {
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })
   const jobs_period = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
   const name_filter = filter.filter((em) => Object.values(em)[0]).map((obj) => Object.keys(obj)[0])
   const time_filter = useMemo(() => times(currentDate) as TimeReportType, [currentDate])

   const modified_users = users.map((u) => {
      const modified_jobs = u.jobs.filter((j) => j.report_period === jobs_period).map((j) => j.hours_worked)

      return {
         name: u.describe_name,
         jobs: modified_jobs[0]
            ? modified_jobs[0].map((_, index) =>
                 modified_jobs.reduce(
                    (sum, jobArr) => {
                       const value = jobArr[index]
                       return value >= 0 ? sum + value : sum
                    },
                    modified_jobs[0][index] < 0 ? modified_jobs[0][index] : 0
                 )
              )
            : []
      }
   })

   const [period, setTimeFilter] = useState<TimeReportItemType>(time_filter['employees'])

   const calculate = useMemo(() => {
      return new CalculateServ(users, period.months, name_filter)
   }, [users, period, name_filter, time_filter])

   useEffect(() => {
      if (currentDate) {
         setTimeFilter(time_filter[period?.id])
      }
   }, [time_filter])

   const func = useCallback(() => {
      period?.id !== 'employees'
         ? exportToExcelByPeriod(calculate, period)
         : exportToExcelByEmployees(calculate, period, modified_users)
   }, [period?.id, name_filter])

   return (
      <div className={css.excel_generator}>
         <FormControl className={css.radio_form}>
            <FormLabel id='demo-radio-buttons-group-label'>{translate('dashboard.timereport-radio_title')}</FormLabel>
            <RadioGroup
               aria-labelledby='demo-radio-buttons-group-label'
               defaultValue={radio_options[0]}
               name='radio-buttons-group'
            >
               {radio_options.map((r) => (
                  <FormControlLabel
                     key={r}
                     sx={sx}
                     value={r}
                     onChange={() => setTimeFilter(time_filter[r])}
                     control={<Radio size='small' />}
                     label={staticTranslate(`dashboard.timereport-radio_${r}`)}
                  />
               ))}
            </RadioGroup>
         </FormControl>
         <button className={css.download_qreport} onClick={func} />
      </div>
   )
}
