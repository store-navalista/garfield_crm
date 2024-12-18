import { COMMON_CELL, NARROW_CELL } from '@/constants/dashboard'
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

   private getCommonTasks() {
      return this.users.map((u) => ({
         name: u.describe_name,
         common_tasks: u.jobs
            .filter((j) => this.period.includes(j.report_period) && j.project_number === COMMON_CELL)
            .map((u) => ({
               hours_worked: u.hours_worked
                  .filter((number) => number > 0)
                  .reduce((accumulator, current) => accumulator + current, 0)
            }))[0]?.hours_worked
      }))
   }

   private getOtherTasksReport() {
      return this.users
         .map((u) => ({
            name: u.describe_name,
            jobs: u.jobs.filter((j) => this.period.includes(j.report_period) && j.project_number === NARROW_CELL)
         }))
         .filter((j) => j.jobs.length)
         .map((j) => ({
            ...j,
            jobs: j.jobs.map((u) => ({
               job_description: u.job_description,
               hours_worked: u.hours_worked
                  .filter((number) => number > 0)
                  .reduce((accumulator, current) => accumulator + current, 0)
            }))
         }))
   }

   private getReportsByPeriod() {
      const regular_tasks = this.users
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

      const modify = regular_tasks.map((t) => {
         const commmon_tasks_hours = this.getCommonTasks().find((j) => j.name === t.name).common_tasks
         if (commmon_tasks_hours) {
            const distributed_hours = (commmon_tasks_hours / t.jobs.length).toFixed(1)

            return {
               ...t,
               jobs: t.jobs.map((j) => ({ ...j, hours_worked: j.hours_worked + Number(distributed_hours) }))
            }
         }
         return t
      })

      return modify
   }

   getAllRegularJobs() {
      const allJobs = this.getReportsByPeriod()
         .map((r) => r.jobs.map((j) => [j.project_number, j.ship_name, j.job_description]))
         .flat(1)
         .sort((a, b) => a[1].localeCompare(b[1]))

      const jobs_set = Array.from(new Set(allJobs.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item))

      const modified_jobs_set = []
      jobs_set.forEach((job) => {
         const exist_index = modified_jobs_set.findIndex((j) => j[0] === job[0])
         if (exist_index === -1) {
            modified_jobs_set.push(job)
         } else {
            modified_jobs_set[exist_index][2] += ` ✦ ${job[2]}`
         }
      })

      return modified_jobs_set
   }

   getAllOtherJobs() {
      const allJobs = this.getOtherTasksReport()
         .map((r) => r.jobs.map((j) => j.job_description))
         .flat(1)
         .sort((a, b) => a.localeCompare(b))

      return Array.from(new Set(allJobs.map((item) => JSON.stringify(item))))
         .map((item) => JSON.parse(item))
         .flat(1)
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

   getAllHoursByEmployeeOtherWork() {
      const mr = this.getOtherTasksReport()

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
      const count_list = allJobTypes.map((t) => {
         const all_work_time = allJob
            .filter((j) => j.project_number === t[0])
            .reduce((acc, value) => acc + value.hours_worked, 0)
         return {
            ИТОГО: all_work_time
         }
      })

      const count_all = count_list.reduce((acc, value) => acc + value.ИТОГО, 0)
      count_list.push({ ИТОГО: count_all })

      return count_list
   }

   getAllHoursByOtherWork() {
      const allJob = this.getOtherTasksReport()
         .map((r) => r.jobs)
         .flat(1)

      const allJobTypes = this.getAllOtherJobs()
      const count_list = allJobTypes.map((t) => {
         const all_work_time = allJob
            .filter((j) => j.job_description === t)
            .reduce((acc, value) => acc + value.hours_worked, 0)
         return {
            ИТОГО: all_work_time
         }
      })

      const count_all = count_list.reduce((acc, value) => acc + value.ИТОГО, 0)
      count_list.push({ ИТОГО: count_all })

      return count_list
   }

   participation(currentJob: [string, string, string]) {
      const mr = this.getReportsByPeriod()

      return mr
         .map((em) => em.name)
         .sort((a, b) => a.localeCompare(b))
         .map((em) => {
            const jobs = mr.find((r) => r.name === em).jobs
            const hours_worked = jobs
               .filter((j) => j.project_number === currentJob[0])
               .map((j) => j.hours_worked)
               .reduce((a, b) => a + b, 0)

            return { [em]: hours_worked ? (hours_worked !== 0 ? hours_worked : '') : '' }
         })
         .reduce((acc, obj) => {
            return { ...acc, ...obj }
         }, {})
   }

   participation_other(currentJob: string) {
      const other_jobs = this.getOtherTasksReport()

      return other_jobs
         .map((em) => em.name)
         .sort((a, b) => a.localeCompare(b))
         .map((em) => {
            const jobs = other_jobs.find((r) => r.name === em).jobs
            return { [em]: jobs.filter((j) => j.job_description === currentJob)[0]?.hours_worked || '' }
         })
         .reduce((acc, obj) => {
            return { ...acc, ...obj }
         }, {})
   }
}
