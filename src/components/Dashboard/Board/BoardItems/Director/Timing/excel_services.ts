export class ExcelServices {
   generateColumnRange(start: string, end: string, startRow: number, endRow: number) {
      const columns = []

      // Определение начального и конечного столбцов
      let isWithinRange = false
      for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
         const column = String.fromCharCode(i)
         if (column === start) isWithinRange = true
         if (isWithinRange) columns.push(column)
         if (column === end) break
      }

      for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
         for (let j = 'A'.charCodeAt(0); j <= 'Z'.charCodeAt(0); j++) {
            const column = String.fromCharCode(i) + String.fromCharCode(j)
            if (column === start) isWithinRange = true
            if (isWithinRange) columns.push(column)
            if (column === end) break
         }
         if (columns[columns.length - 1] === end) break
      }

      const rows = []
      for (let i = startRow; i <= endRow; i++) {
         rows.push(i)
      }

      return { columns, rows }
   }

   // Применение стилей к ячейкам
   applyStylesToRange(ws: Record<any, any>, columns: string[], rows: number[], styles: Record<any, any>) {
      columns.forEach((column) => {
         rows.forEach((row) => {
            const cellAddress = column + row

            if (!ws[cellAddress]) {
               ws[cellAddress] = { v: '' }
            }

            ws[cellAddress].s = {
               ...ws[cellAddress].s,
               ...styles
            }
         })
      })
   }

   // Применение стилей к одной колонке
   applyStylesToColumn(
      ws: Record<any, any>,
      column: string,
      startRow: number,
      endRow: number,
      styles: Record<any, any>
   ) {
      const rows = []
      for (let i = startRow; i <= endRow; i++) {
         rows.push(i)
      }
      this.applyStylesToRange(ws, [column], rows, styles)
   }

   // Применение стилей к одной строке
   applyStylesToRow(
      ws: Record<any, any>,
      row: number,
      startColumn: string,
      endColumn: string,
      styles: Record<any, any>
   ) {
      const { columns } = this.generateColumnRange(startColumn, endColumn, row, row)
      this.applyStylesToRange(ws, columns, [row], styles)
   }

   setColumnWidths(ws: Record<any, any>, columns: string[], width: number) {
      if (!ws['!cols']) {
         ws['!cols'] = []
      }
      columns.forEach((column) => {
         let colIndex = 0
         if (column.length === 1) {
            colIndex = column.charCodeAt(0) - 'A'.charCodeAt(0)
         } else if (column.length === 2) {
            colIndex = (column.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * 26 + (column.charCodeAt(1) - 'A'.charCodeAt(0))
         }
         ws['!cols'][colIndex] = { wch: width }
      })
   }
}
