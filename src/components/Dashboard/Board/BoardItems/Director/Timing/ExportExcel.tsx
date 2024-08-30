import React, { FC, useEffect } from 'react'
import { saveAs } from 'file-saver'
import XLSX from 'sheetjs-style'
import css from './Timing.module.scss'
import { IUser } from '@/constants/users'

interface ExportExcelProps {
   fileName: string
   users: IUser[]
   currentDate: Date
}

export const ExportExcel: FC<ExportExcelProps> = ({ fileName, users, currentDate }) => {
   const period = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })

   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
   const fileExtention = '.xlsx'

   // only third party work
   const monthReports = users.map((u) => ({
      name: u.describe_name,
      jobs: u.jobs
         .filter((j) => j.report_period === period && j.ship_name)
         .map((u) => ({
            ...u,
            hours_worked: u.hours_worked
               .filter((number) => number > 0)
               .reduce((accumulator, current) => accumulator + current, 0)
         }))
   }))

   const allJobs = monthReports.map((r) => r.jobs.map((j) => `${j.ship_name}-${j.job_description}`)).flat(1)

   const row = new Set(allJobs)
   // console.log(allJobs)
   console.log(row.keys())

   // console.log(monthReports.map((r) => ({ [r.name]: 'sds' })))
   // console.log(monthReports.map((r) => r.jobs.map((j) => `${j.project_number}-${j.ship_name}-${j.job_description}`)))

   // console.log({
   //    '№': 'сторонний',
   //    '№ РАБОТЫ': null,
   //    Объект: 'Общие вопросы',
   //    'Название работы': null,
   //    ...{ sdfsdfs: '22' },
   //    Name1: '16',
   //    Name2: '16'
   // })

   const ExcelData = [
      {
         '№': 'сторонний',
         '№ РАБОТЫ': null,
         Объект: 'Общие вопросы',
         'Название работы': null,
         ...{ sdfsdfs: '22' },
         Name1: '16',
         Name2: '16'
      },
      {
         '№': 'A01',
         '№ РАБОТЫ': 2233445,
         Объект: 'SERAPHIM SAROVSKIY',
         'Название работы': 'DG Installation design',
         Name: '2'
      }
   ]
   // const employees = allJobs.map((e) => e.name)

   // const e = monthReports.map((j) => ({
   //    '№': 'сторонний',
   //    '№ РАБОТЫ': null,
   //    Объект: 'Общие вопросы',
   //    'Название работы': null,
   //    Name: '16'
   // }))

   // console.log(monthReports)

   const exportToExcel = async () => {
      const ws = {}

      ws['!rows'] = []
      ws['!rows'][1] = { hpx: 44, s: { font: { bold: true } } }

      ws['!cols'] = [{ wch: 11 }, { wch: 11 }, { wch: 20 }, { wch: 20 }]

      ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }]

      ws['A1'] = {
         v: 'NAVALISTA',
         s: { fill: { fgColor: { rgb: '1F497D' } }, font: { color: { rgb: 'FFFFFF' }, bold: true, sz: 11 } }
      }

      XLSX.utils.sheet_add_json(ws, ExcelData, { origin: 'A2' })

      const commonCells = ['E'.charCodeAt(0), 'Z'.charCodeAt(0)]

      for (let i = commonCells[0]; i <= commonCells[1]; i++) {
         const cellAddress = String.fromCharCode(i) + 3

         ws[cellAddress] = {
            v: '',
            s: {
               font: { bold: true, sz: 12, color: { rgb: '000000' } },
               alignment: { horizontal: 'center' },
               fill: { fgColor: { rgb: '1F497D' } },
               border: {}
            }
         }
      }
      console.log(ws)

      for (const cell in ws) {
         if (ws[cell] && typeof ws[cell] === 'object' && ws[cell].s === undefined) {
            ws[cell].s = { font: { sz: 11 } }
         }
      }

      const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: fileType })
      saveAs(data, fileName + fileExtention)
   }

   return <button className={css.download_qreport} onClick={exportToExcel} />
}
