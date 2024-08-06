interface IJS {
   NAV: { name: string; type: 'icon-btn' | 'file-btn' }[]
}

export type IJob = Partial<{
   id: number
   ship_name: string
   project_number: string
   job_description: string
   hours_worked: number[]
   report_period: string
   order: number
   user_id: string
}>

export const JC: IJS = {
   NAV: [
      { name: 'add', type: 'icon-btn' },
      { name: 'add_common', type: 'icon-btn' },
      // { name: 'save', type: 'icon-btn' },
      // { name: 'download', type: 'file-btn' },
      // { name: 'upload', type: 'icon-btn' },
      { name: 'reset', type: 'icon-btn' }
      // { name: 'clean', type: 'icon-btn' }
   ] // navigate buttons
}
