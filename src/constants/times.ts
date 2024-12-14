type RadioType = 'monthly' | 'first_quarter' | 'second_quarter' | 'third_quarter' | 'fourth_quarter' | 'employees'

export const radio_options: RadioType[] = [
   'employees',
   'monthly',
   'first_quarter',
   'second_quarter',
   'third_quarter',
   'fourth_quarter'
]

export type TimeReportType = {
   [key in RadioType]: {
      id: RadioType
      months: string[]
      label: string
   }
}

export type TimeReportItemType = TimeReportType[RadioType]

export const times = (currentDate: Date) => {
   const year = currentDate.toLocaleString('en-US', { year: 'numeric' })
   const month = currentDate.toLocaleString('en-US', { month: 'long' })

   const periods = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ].map((m) => `${m} ${year}`)

   const quarters: TimeReportType = {
      employees: { id: 'employees', months: [`${month} ${year}`], label: `${month}_${year}` },
      monthly: { id: 'monthly', months: [`${month} ${year}`], label: `${month}_${year}` },
      first_quarter: { id: 'first_quarter', months: periods.slice(0, 3), label: `1_кв_${year}` },
      second_quarter: { id: 'second_quarter', months: periods.slice(3, 6), label: `2_кв_${year}` },
      third_quarter: { id: 'third_quarter', months: periods.slice(6, 9), label: `3_кв_${year}` },
      fourth_quarter: { id: 'fourth_quarter', months: periods.slice(9, 12), label: `4_кв_${year}` }
   }

   return quarters
}
