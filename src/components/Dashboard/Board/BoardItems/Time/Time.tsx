import Loader from '@/components/UI/loader/Loader'
import { COMMON_CELL } from '@/constants/dashboard'
import { IJob } from '@/constants/jobs'
import { useAppSelector } from '@/hooks/redux'
import useUserByID from '@/hooks/useUserByID'
import translate from '@/i18n/translate'
import { useGetJobsByUserIdAndPeriodQuery, useUpdateJobsByUserIdAndPeriodMutation } from '@/store/reducers/apiReducer'
import _ from 'lodash'
import Image from 'next/image'
import React, { CSSProperties, FC, Fragment, useEffect, useMemo, useReducer, useState } from 'react'
import css from '../Boards.module.scss'
import TimeHeader from './TimeHeader/TimeHeader'
import TimeJob from './TimeJob/TimeJob'
import TimeNavigate from './TimeNavigate/TimeNavigate'
import TimeService from './services'

interface IJobDataAction {
   type:
      | 'ship_name'
      | 'project_number'
      | 'job_description'
      | 'hours_worked'
      | 'order'
      | 'add'
      | 'remove'
      | 'reset'
      | 'reload'
      | 'add_common'
   payload: { val: any; index: number } | number | string | ''
}

const Time: FC = () => {
   const { data: user } = useUserByID()
   const [sendData, { isLoading: updateLoading }] = useUpdateJobsByUserIdAndPeriodMutation()
   const [currentDate, setCurrentDate] = useState(new Date())
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const timeService = new TimeService(i18n)
   const [isCommonTasks, setisCommonTasks] = useState<any>()
   const period = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
   const { data, isSuccess, isError, refetch } = useGetJobsByUserIdAndPeriodQuery({
      userId: user?.id,
      period
   })
   const sortedData = useMemo(() => {
      if (data) {
         return [...data].sort((a, b) => a.order - b.order)
      }
   }, [data])

   const days = timeService.getDaysOfMonth(currentDate)

   const new_hours_worked = useMemo(() => {
      return days.map((d) => (d.day_of ? -0.5 : 0))
   }, [currentDate])

   const empty_job = {
      ship_name: '',
      job_description: '',
      project_number: '',
      hours_worked: new_hours_worked,
      report_period: period
   }

   const [jobs, updateJobs] = useReducer((state: IJob[], action: IJobDataAction): IJob[] => {
      const updateProperty = (property: IJobDataAction['type']) => {
         const { val, index } = action.payload as { val: string | number | number[]; index: number }

         let correctVal = val

         if (property === 'project_number') {
            correctVal = action.payload['val'].replace(/\D/g, '')
         }

         const updatedJob = { ...state[index], [property]: correctVal }

         return [...state.slice(0, index), updatedJob, ...state.slice(index + 1)]
      }

      switch (action.type) {
         case 'ship_name':
            return updateProperty('ship_name')
         case 'project_number': {
            return updateProperty('project_number')
         }
         case 'job_description': {
            return updateProperty('job_description')
         }
         case 'hours_worked': {
            return updateProperty('hours_worked')
         }
         case 'order': {
            return updateProperty('order')
         }
         case 'add': {
            return !state
               ? [{ ...empty_job, order: 0 }]
               : [...state, { ...empty_job, order: state[state.length - 1]?.order + 1 }]
         }
         case 'add_common': {
            return [{ ...empty_job, project_number: COMMON_CELL, order: -1 }, ...state]
         }
         case 'remove': {
            if (state[action.payload as number].project_number === COMMON_CELL) {
               const modify = state.slice(1)
               return modify
            }

            const filtered = [...state].filter((j) => j.project_number !== COMMON_CELL)
            return filtered.length <= 1 ? state : [...state].filter((_, i) => i !== action.payload)
         }
         case 'reload':
            return [...sortedData]
         case 'reset': {
            return [{ ...empty_job, order: 0 }]
         }
         default:
            return state
      }
   }, sortedData)

   const snapshot = useMemo(() => {
      if (sortedData?.at(0)) {
         return _.cloneDeep(
            sortedData.map((job) => {
               const { id, ...rest } = job
               return rest
            })
         )
      } else {
         if (jobs) {
            return _.cloneDeep(
               jobs?.map((job) => {
                  const { id, ...rest } = job
                  return rest
               })
            )
         }
      }
   }, [sortedData, currentDate])

   const findCommonTasks = () => {
      if (jobs?.find((j) => j.project_number === COMMON_CELL)) {
         setisCommonTasks(true)
      } else {
         setisCommonTasks(false)
      }
   }

   useEffect(() => {
      findCommonTasks()
   }, [currentDate, jobs])

   const timeServiceProps = {
      timeService,
      currentDate,
      setCurrentDate,
      days,
      updateJobs,
      findCommonTasks,
      jobs,
      snapshot,
      sortedData
   }

   const sendReport = async () => {
      const updateJobsData = { userId: user?.id, period, jobs }
      const result = await sendData(updateJobsData)

      if ('error' in result) return
      await refetch()
   }

   useEffect(() => {
      if (isSuccess && data.length) {
         return updateJobs({ type: 'reload', payload: '' })
      }

      if (!jobs?.length) updateJobs({ type: 'add', payload: '' })
   }, [data, currentDate])

   if (!jobs) return <Loader />

   return (
      <div className={css.time}>
         <h2>{translate('dashboard.timereport-title')}</h2>
         <div className={css.body}>
            <TimeHeader {...timeServiceProps} />
            {jobs.map((j, index) => {
               const jobProps = { j, days, jobs, updateJobs, isCommonTasks }

               return (
                  <Fragment key={index}>
                     <TimeJob {...jobProps} index={index} />
                  </Fragment>
               )
            })}
            <TimeNavigate updateJobs={updateJobs} isCommonTasks={isCommonTasks} />
            <button onClick={sendReport} className={css.send} disabled={updateLoading}>
               {updateLoading ? null : translate('dashboard.timereport-send')}
               <Image
                  style={{ display: updateLoading ? 'block' : 'none' }}
                  src='/assets/images/svg/request-loader.svg'
                  width={14}
                  height={14}
                  alt='loader'
               />
            </button>
            <div className={css.network_status}>
               <p>{translate('server-status')}:</p>
               <span style={{ '--bg': isError ? 'red' : 'green' } as CSSProperties} />
            </div>
         </div>
      </div>
   )
}

export default Time
