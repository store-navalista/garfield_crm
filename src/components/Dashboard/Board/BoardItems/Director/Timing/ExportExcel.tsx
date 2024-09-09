import { radio_options, TimeReportItemType, TimeReportType, times } from '@/constants/times'
import { IUser } from '@/constants/users'
import translate from '@/i18n/translate'
import { FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import { saveAs } from 'file-saver'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import XLSX from 'sheetjs-style'
import { excel_styles } from './excel_styles'
import { CalculateServ } from './services'
import { FilterType } from './Timing'
import css from './Timing.module.scss'

interface ExportExcelProps {
   users: IUser[]
   currentDate: Date
   filter: FilterType
}

const sx = {
   '.MuiFormControlLabel-label': {
      fontSize: '12px'
   },
   '.MuiRadio-colorPrimary': {
      padding: '4px'
   },
   '& .Mui-checked': {
      color: 'var(--main-blue)'
   }
}

export const ExportExcel: FC<ExportExcelProps> = ({ users, currentDate, filter }) => {
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })

   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
   const fileExtention = '.xlsx'

   const name_filter = filter.filter((em) => Object.values(em)[0]).map((obj) => Object.keys(obj)[0])
   const time_filter = times(currentDate) as TimeReportType

   const [period, setTimeFilter] = useState<TimeReportItemType>(time_filter['monthly'])

   const calculate = useMemo(() => {
      return new CalculateServ(users, period.months, name_filter)
   }, [users, period, name_filter])

   const allJobs = calculate.getAllRegularJobs()

   useEffect(() => {
      if (currentDate) {
         setTimeFilter(time_filter['monthly'])
      }
   }, [currentDate])

   const exportToExcel = () => {
      if (!allJobs.find((j) => j[0] === 'ИТОГО')) allJobs.push(['ИТОГО', '', ''])
      const all_work_time = calculate.getAllHoursByWork()

      const ExcelData = allJobs.map((job: [string, string, string], i: number) => {
         const hours_work = job[0] === 'ИТОГО' ? calculate.getAllHoursByEmployee() : calculate.participation(job)

         return {
            '№': job[0] === 'ИТОГО' ? '' : 'сторонний',
            '№ РАБОТЫ': job[0],
            Объект: job[1],
            'Название работы': job[2],
            ...hours_work,
            ...all_work_time[i]
         }
      })

      const ws = {}

      ws['!rows'] = []
      ws['!rows'][1] = { hpx: 44, s: { font: { bold: true } } }

      ws['!cols'] = [{ wch: 11 }, { wch: 11 }, { wch: 20 }, { wch: 40 }]

      ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }]

      ws['A1'] = {
         v: 'NAVALISTA',
         s: { fill: { fgColor: { rgb: '1F497D' } }, font: { color: { rgb: 'FFFFFF' }, bold: true, sz: 11 } }
      }

      XLSX.utils.sheet_add_json(ws, ExcelData, { origin: 'A2' })

      for (const cell in ws) {
         if (ws[cell] && typeof ws[cell] === 'object') {
            ws[cell].s = ws[cell].s || {}
            ws[cell].s.font = ws[cell].s.font || { sz: 11 }
            ws[cell].s.border = excel_styles.border
         }
      }

      for (let i = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)][0]; i <= ['A'.charCodeAt(0), 'Z'.charCodeAt(0)][1]; i++) {
         const cellAddress = String.fromCharCode(i) + 2

         if (!ws[cellAddress]) {
            ws[cellAddress] = { v: '' }
         }

         ws[cellAddress].s = {
            ...ws[cellAddress].s,
            font: { sz: 11, bold: true },
            alignment: excel_styles.alignment
         }
      }

      for (let i = ['E'.charCodeAt(0), 'Z'.charCodeAt(0)][0]; i <= ['A'.charCodeAt(0), 'Z'.charCodeAt(0)][1]; i++) {
         const cellAddress = String.fromCharCode(i) + 2

         if (!ws[cellAddress]) {
            ws[cellAddress] = { v: '' }
         }

         ws[cellAddress].s = {
            ...ws[cellAddress].s,
            fill: { fgColor: { rgb: 'DCE6F1' } }
         }

         for (let j = 3; j <= 100; j++) {
            const cellAddress = String.fromCharCode(i) + j

            if (!ws[cellAddress]) {
               ws[cellAddress] = { v: '' }
            }

            if (ws[cellAddress].v || ws[cellAddress].v === 0) {
               ws[cellAddress].s = {
                  ...ws[cellAddress].s,
                  font: { sz: 11, bold: true },
                  fill: { fgColor: { rgb: 'F5F5F5' } },
                  alignment: excel_styles.alignment
               }
            }
         }
      }

      const sheet_name = period.label
      const fileName = `00_ПРОДАЖИ_ВРЕМЕНИ_${period.label}_NAVALISTA`

      const wb = { Sheets: { [sheet_name]: ws }, SheetNames: [sheet_name] }
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: fileType })
      saveAs(data, fileName + fileExtention)
   }

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
         <button className={css.download_qreport} onClick={exportToExcel} />
      </div>
   )
}
