import { IJob } from '@/constants/jobs'

export const clearJobs = (jobs: IJob[]) =>
   jobs.filter((j) => {
      if (`${j.project_number}${j.job_description}${j.ship_name}`) {
         return j
      }
   })
