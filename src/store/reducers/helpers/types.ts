import { IJob } from '@/constants/jobs'

export interface CreateUserData {
   describe_name: string
   describe_date?: string
   describe_specialization?: string
   describe_position?: string
   describe_password: string
   CTO?: boolean
   mail?: string
}

export type UpdateUserData = Omit<CreateUserData, 'describe_password'>

export interface UpdateJobsData {
   userId: string
   period: string
   jobs: IJob[]
}

export interface TokenResponse {
   login: { access_token: string; refresh_token?: string }
}

export interface RefreshResponse {
   refresh: {
      access_token: string
   }
}
