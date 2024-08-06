export type DayType = { day: number; day_of?: boolean; formatDay: string; week_order: number }

class TimeService {
   formattedI18n: string
   private week_days: string[]

   constructor(i18n: string) {
      this.formattedI18n = i18n === 'en' ? 'en-US' : 'ru-RU'
      this.week_days = []
      this.fill_week_days()
   }

   private fill_week_days() {
      const options = { weekday: 'long' } as Intl.DateTimeFormatOptions
      const baseDate = new Date(1970, 0, 5) // 1970-01-05 is a Monday
      for (let i = 0; i < 7; i++) {
         const date = new Date(baseDate)
         date.setDate(baseDate.getDate() + i)
         const dayName = new Intl.DateTimeFormat(this.formattedI18n, options).format(date)
         this.week_days.push(dayName)
      }
   }

   getDaysOfMonth(currentDate: Date): DayType[] {
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
      const daysOfMonth = Array.from({ length: lastDayOfMonth }, (_, index) => {
         const day = index + 1
         const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
         const dayOfWeek = date.getDay()
         const day_of = dayOfWeek === 0 || dayOfWeek === 6

         const options = { weekday: 'long' } as Intl.DateTimeFormatOptions
         const formatDay = ((date: Date) => new Intl.DateTimeFormat(this.formattedI18n, options).format(date))(date)

         return {
            day,
            formatDay,
            week_order: dayOfWeek,
            ...(day_of ? { day_of } : {})
         }
      })

      return daysOfMonth
   }

   getDMYformattedTime(currentDate: Date) {
      const day = currentDate.getDate().toString().padStart(2, '0')
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
      const year = currentDate.getFullYear()
      const formattedDate = `${day}/${month}/${year}`
      return formattedDate
   }

   getPreviousMonth(prevDate: Date): Date {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() - 1)
      return newDate
   }

   getNextMonth(prevDate: Date): Date {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + 1)
      return newDate
   }

   formatDateToMonthYear(date: Date): string {
      const options = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions
      return new Intl.DateTimeFormat(this.formattedI18n, options).format(date)
   }
}

export default TimeService
