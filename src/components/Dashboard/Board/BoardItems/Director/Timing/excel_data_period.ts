import XLSX from 'sheetjs-style'
import { excel_styles } from './excel_styles'
import { saveAs } from 'file-saver'

export const exportToExcelByPeriod = (calculate, period) => {
   const get_ws_regular = (ExcelData: Record<string, string>[]) => {
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

      return ws
   }

   const get_ws_other = (ExcelData: Record<string, string>[]) => {
      const ws = {}

      ws['!rows'] = []
      ws['!rows'][1] = { hpx: 44, s: { font: { bold: true } } }

      ws['!cols'] = [{ wch: 40 }]

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

      for (let i = ['B'.charCodeAt(0), 'Z'.charCodeAt(0)][0]; i <= ['A'.charCodeAt(0), 'Z'.charCodeAt(0)][1]; i++) {
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

      return ws
   }

   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
   const fileExtention = '.xlsx'

   const allJobs = calculate.getAllRegularJobs()
   const allOtherTasks = calculate.getAllOtherJobs()

   if (!allJobs.find((j) => j[0] === 'ИТОГО')) allJobs.push(['ИТОГО', '', ''])
   if (!allOtherTasks.includes('ИТОГО') && allOtherTasks?.length) allOtherTasks.push('ИТОГО')

   const all_work_time = calculate.getAllHoursByWork()
   const all_other_work_time = calculate.getAllHoursByOtherWork()

   const RegularExcelData = allJobs.map((job: [string, string, string], i: number) => {
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

   const isOtherTasksExist = allOtherTasks.length

   const OtherExcelData = allOtherTasks.map((job: string, i: number) => {
      const hours_work =
         job === 'ИТОГО' ? calculate.getAllHoursByEmployeeOtherWork() : calculate.participation_other(job)

      return {
         'Название работы': job,
         ...hours_work,
         ...all_other_work_time[i]
      }
   })

   const ws_regular = get_ws_regular(RegularExcelData)
   const ws_other = get_ws_other(OtherExcelData)

   const sheet_name = period.label
   const fileName = `00_ПРОДАЖИ_ВРЕМЕНИ_${period.label}_NAVALISTA`
   const wb = {
      Sheets: { [sheet_name]: ws_regular, Другое: isOtherTasksExist ? ws_other : null },
      SheetNames: isOtherTasksExist ? [sheet_name, 'Другое'] : [sheet_name]
   }
   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
   const data = new Blob([excelBuffer], { type: fileType })

   // saveAs(data, fileName + fileExtention)
}
