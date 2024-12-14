import XLSX from 'sheetjs-style'
import { excel_styles } from './excel_styles'
import { saveAs } from 'file-saver'
import { ExcelServices } from './excel_services'

export const exportToExcelByEmployees = (calculate, period, modified_users) => {
   const excelServices = new ExcelServices()
   const get_ws_regular = (ExcelData: Record<string, string>[]) => {
      const ws = {}

      ws['!rows'] = []

      ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }]

      ws['A1'] = {
         v: 'NAVALISTA',
         s: { fill: { fgColor: { rgb: '1F497D' } }, font: { color: { rgb: 'FFFFFF' }, bold: true, sz: 11 } }
      }

      XLSX.utils.sheet_add_json(ws, ExcelData, { origin: 'A2' })

      const { columns: all_columns, rows: all_rows } = excelServices.generateColumnRange('A', 'AK', 2, 55)

      excelServices.applyStylesToRange(ws, all_columns, all_rows, {
         font: { sz: 11, bold: true },
         alignment: excel_styles.alignment,
         border: excel_styles.border
      })

      excelServices.applyStylesToColumn(ws, 'A', 2, 55, {
         alignment: { horizontal: 'left' },
         font: { sz: 12 }
      })

      excelServices.applyStylesToRow(ws, 2, 'B', 'AK', {
         fill: { fgColor: { rgb: 'DCE6F1' } }
      })

      excelServices.setColumnWidths(ws, all_columns, 5)
      excelServices.setColumnWidths(ws, ['A'], 30)

      return ws
   }

   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
   const fileExtention = '.xlsx'

   const allJobs = calculate.getAllRegularJobs()
   const allOtherTasks = calculate.getAllOtherJobs()

   if (!allJobs.find((j) => j[0] === 'ИТОГО')) allJobs.push(['ИТОГО', '', ''])
   if (!allOtherTasks.includes('ИТОГО') && allOtherTasks?.length) allOtherTasks.push('ИТОГО')

   const RegularExcelData = calculate?.name_filter
      .sort((a: string, b: string) => a.localeCompare(b))
      .map((employee: string) => {
         const all_day_report = modified_users.find((u) => u.name === employee).jobs

         const days = {}
         all_day_report.forEach((r, i) => {
            days[` ${i + 1} `] = r > 0 ? r : ''
         })

         const all_hours_by_month = all_day_report.reduce((a, b) => (b > 0 ? a + b : a), 0)

         const row = {
            Сотрудник: employee,
            ...days,
            Всего: all_hours_by_month
         }

         return row
      })

   const ws_regular = get_ws_regular(RegularExcelData)

   const sheet_name = period.label
   const fileName = `00_ПРОДАЖИ_ВРЕМЕНИ_${period.label}_NAVALISTA`
   const wb = {
      Sheets: { [sheet_name]: ws_regular },
      SheetNames: [sheet_name]
   }
   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
   const data = new Blob([excelBuffer], { type: fileType })

   saveAs(data, fileName + fileExtention)
}
