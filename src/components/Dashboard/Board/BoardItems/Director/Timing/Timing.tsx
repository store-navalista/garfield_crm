import { IJob } from '@/constants/jobs'
import { IUser } from '@/constants/users'
import { useAppSelector } from '@/hooks/redux'
import translate from '@/i18n/translate'
import { useGetUsersQuery } from '@/store/reducers/apiReducer'
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react'
import TimeService from '../../Time/services'
import Filters from './Components/Filters'
import Header from './Components/Header'
import Job from './Components/Job'
import Person from './Components/Person'
import css from './Timing.module.scss'
import { COMMON_CELL } from '@/constants/dashboard'

type Days = { days: ReturnType<TimeService['getDaysOfMonth']> }

export type IOpenedJobs = {
   id: string
   isOpen: boolean
}[]

interface Props extends Days {
   openedJobs?: IOpenedJobs
   setOpenedJobs?: React.Dispatch<React.SetStateAction<IOpenedJobs>>
}

export interface HeaderProps extends Props {
   timeService: TimeService
   currentDate: Date
   setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
}

export interface PersonProps extends Props {
   user: IUser
   isReportExist: boolean
   filteredJobs: IJob[]
}

export interface JobProps extends Props {
   currentJob: IJob
}

const Timing: FC = () => {
   const { data: users, isLoading, refetch } = useGetUsersQuery()
   const [currentDate, setCurrentDate] = useState(new Date())
   const period = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
   const [openedJobs, setOpenedJobs] = useState<IOpenedJobs>([])
   const [activeFilter, setActiveFilter] = useState(null)
   const i18n = useAppSelector((state) => state.reducer.content.i18n)
   const timeService = new TimeService(i18n)
   const days = timeService.getDaysOfMonth(currentDate)

   const filters = useMemo(() => [new Set(), new Set(), new Set()] as Set<string>[], [currentDate])

   useEffect(() => {
      if (users) {
         setOpenedJobs(
            users.map((user) => {
               return { id: user.id, isOpen: false }
            })
         )

         users.forEach((user) => {
            user.jobs.forEach((j) => {
               if (j.report_period !== period || j.project_number === COMMON_CELL) return
               if (j.project_number) filters[0].add(j.project_number)
               if (j.ship_name) filters[1].add(j.ship_name)
               if (j.job_description) filters[2].add(j.job_description)
            })
         })
      }
   }, [users, currentDate])

   useEffect(() => {
      refetch()
      setActiveFilter(null)
   }, [currentDate])

   if (isLoading) {
      return <div>Loading...</div>
   }

   return (
      <div className={css.wrapper}>
         <h2>{translate('dashboard.timereport-director-timing-title')}</h2>
         <div className={css.timing}>
            <Filters filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <Header {...{ timeService, currentDate, setCurrentDate, days, openedJobs, setOpenedJobs, filters }} />
            {users.map((user) => {
               const { id, jobs } = user
               const isOpen = openedJobs.find((j) => j.id === id)?.isOpen
               const currentJobs = jobs.filter((j) => j.report_period === period)
               const isReportExist = !!currentJobs.length

               const filteredJobs = [...currentJobs].filter((j) => {
                  if (activeFilter) {
                     const [key, value] = [...Object.keys(activeFilter), ...Object.values(activeFilter)] as string[]
                     return j[key] === value
                  }
                  return j
               })

               return (
                  <Fragment key={id}>
                     <Person {...{ user, days, isReportExist, filteredJobs, setOpenedJobs, openedJobs }} />
                     {isOpen
                        ? filteredJobs.map((currentJob, i) => (
                             <Fragment key={i}>
                                <Job currentJob={currentJob} days={days} />
                             </Fragment>
                          ))
                        : null}
                  </Fragment>
               )
            })}
         </div>
      </div>
   )
}

export default Timing
