import { IUser } from '@/constants/users'

export class CalculateServ {
   private users: IUser[]
   private period: string[]
   private name_filter: string[] = []

   constructor(users: IUser[], period: string[], name_filter: string[] = []) {
      this.users = users
      this.period = period
      this.name_filter = name_filter
   }

   private getReportsByPeriod() {
      return this.users
         .map((u) => ({
            name: u.describe_name,
            jobs: u.jobs
               .filter((j) => this.period.includes(j.report_period) && j.ship_name)
               .map((u) => ({
                  ...u,
                  hours_worked: u.hours_worked
                     .filter((number) => number > 0)
                     .reduce((accumulator, current) => accumulator + current, 0)
               }))
         }))
         .filter((r) => this.name_filter.includes(r.name))
   }

   getAllRegularJobs() {
      const allJobs = this.getReportsByPeriod()
         .map((r) => r.jobs.map((j) => [j.project_number, j.ship_name, j.job_description]))
         .flat(1)
         .sort((a, b) => a[1].localeCompare(b[1]))

      return Array.from(new Set(allJobs.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item))
   }

   getAllHoursByEmployee() {
      const mr = this.getReportsByPeriod()

      return mr
         .map((em) => em.name)
         .sort((a, b) => a.localeCompare(b))
         .map((em) => {
            const jobs = mr.find((r) => r.name === em).jobs
            const hours_worked = jobs.reduce((acc, j) => acc + j.hours_worked, 0)

            return { [em]: hours_worked ? (hours_worked !== 0 ? hours_worked : 0) : 0 }
         })
         .reduce((acc, obj) => {
            return { ...acc, ...obj }
         }, {})
   }

   getAllHoursByWork() {
      const allJob = this.getReportsByPeriod()
         .map((r) => r.jobs)
         .flat(1)

      const allJobTypes = this.getAllRegularJobs()

      return allJobTypes.map((t) => {
         const all_work_time = allJob
            .filter((j) => `${j.project_number},${j.ship_name},${j.job_description}` === t.join())
            .reduce((acc, value) => acc + value.hours_worked, 0)
         return {
            ИТОГО: all_work_time
         }
      })
   }

   participation(currentJob: [string, string, string]) {
      const mr = this.getReportsByPeriod()

      return mr
         .map((em) => em.name)
         .sort((a, b) => a.localeCompare(b))
         .map((em) => {
            const jobs = mr.find((r) => r.name === em).jobs
            const hours_worked = jobs.filter(
               (j) => `${j.project_number},${j.ship_name},${j.job_description}` === currentJob.join()
            )[0]?.hours_worked

            return { [em]: hours_worked ? (hours_worked !== 0 ? hours_worked : '') : '' }
         })
         .reduce((acc, obj) => {
            return { ...acc, ...obj }
         }, {})
   }
}
