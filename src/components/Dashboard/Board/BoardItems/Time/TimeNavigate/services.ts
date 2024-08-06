// import { IUser } from '@/constants/users'
// import { JobsActions } from '@/store/reducers/jobsReducer'
// import { saveAs } from 'file-saver'
// import { ChangeEvent } from 'react'
// import { reactLocalStorage } from 'reactjs-localstorage'

// export class Services {
//    currentTask: {
//       value: string
//       time: string
//    }

//    constructor() {
//       this.currentTask = { value: '', time: '' }
//    }

//    save(period: string, jobs: any[]) {
//       const local = reactLocalStorage.getObject('jobsLocal') as IUser

//       if (!Object.keys(local).length) {
//          const newLocal = { employee: 'Otinov_AV', currentTask: this.currentTask, reports: [{ period, jobs }] }
//          return reactLocalStorage.setObject('jobsLocal', newLocal)
//       }

//       const exist = local.reports.find((r) => r.period === period)
//       if (!exist) {
//          const updatedLocal = {
//             ...local,
//             currentTask: this.currentTask,
//             reports: [...local.reports, { period, jobs }]
//          }
//          return reactLocalStorage.setObject('jobsLocal', updatedLocal)
//       } else {
//          const updatedReports = local.reports.map((r) => (r.period === period ? { ...r, jobs } : r))
//          const updatedLocal = { ...local, currentTask: this.currentTask, reports: updatedReports }
//          return reactLocalStorage.setObject('jobsLocal', updatedLocal)
//       }
//    }

//    upload() {
//       const local = reactLocalStorage.getObject('jobsLocal') as IUser

//       if (Object.keys(local).length) {
//          const jsonData = JSON.stringify(local, null, 2)
//          const fileName = `${local.employee}_report.json`

//          const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' })
//          saveAs(blob, fileName)
//       } else {
//          console.warn('No local data available to upload.')
//       }
//    }

//    download(event: ChangeEvent<HTMLInputElement>, dispatch: any) {
//       const currentDate = new Date()
//       const fileInput = event.target
//       const file = fileInput.files && fileInput.files[0]
//       const period = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })

//       if (file) {
//          const reader = new FileReader()

//          reader.onload = (e) => {
//             try {
//                const result = e.target?.result

//                if (result) {
//                   const parsedData = JSON.parse(result as string)
//                   reactLocalStorage.setObject('jobsLocal', parsedData)

//                   const local = reactLocalStorage.getObject('jobsLocal') as IUser

//                   const currentJobs = local?.reports?.find((r) => r.period === period)?.jobs
//                   if (currentJobs) dispatch(JobsActions.updateJobs(currentJobs))
//                }
//             } catch (error) {
//                console.error('Error parsing JSON file:', error)
//             }
//          }

//          reader.onloadend = () => {
//             fileInput.value = ''
//          }

//          reader.readAsText(file)
//       }
//    }

//    send_task(value: string, period: string) {
//       const currentDate = new Date()
//       const time = `${currentDate.getHours()}.${currentDate.getMinutes()} ${period}`

//       this.currentTask = { value, time }
//    }
// }
