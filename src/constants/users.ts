type TCurrentTask = {
   value: string
   time: string
}

export type RolesType = 'Employee' | 'CTO' | 'Moderator'

export interface Job {
   id: number
   ship_name: string
   job_description: string
   project_number: string
   hours_worked: number[]
   report_period: string
   order: number
}

export interface IUser {
   id: string
   describe_name: string
   describe_date?: string
   describe_specialization?: string
   describe_position?: string
   describe_role: RolesType
   currentTask?: string
   jobs: Job[]
   describe_password: string
   mail: string
}
