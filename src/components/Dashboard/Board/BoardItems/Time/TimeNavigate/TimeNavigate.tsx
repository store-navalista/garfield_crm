import { Buttons } from '@/components/UI/dashboard'
import { IconTooltip } from '@/components/UI/icon-tooltip/IconTooltip'
import { Input } from '@/components/UI/input/Input'
import { JC } from '@/constants/jobs'
import React, { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import css from './TimeNavigate.module.scss'
import { CalcModal } from './CalcModal'
import { IJobDataAction } from '../Time'

interface ITimeNavigate {
   updateJobs: React.Dispatch<IJobDataAction>
   isCommonTasks: boolean
   work_numbers: string[]
}

const TimeNavigate: FC<ITimeNavigate> = ({ updateJobs, isCommonTasks, work_numbers }) => {
   const [currentTask, setCurrentTask] = useState({ value: '', time: '' })
   const [isCalcModal, setisCalcModal] = useState(false)
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })

   const actions = (type: string) => {
      switch (type) {
         case 'add':
            return () => updateJobs({ type: 'add', payload: '' })
         case 'add_calculated':
            return () => setisCalcModal(true)
         case 'add_common':
            return () => updateJobs({ type: 'add_common', payload: '' })
         case 'add_narrow_profile':
            return () => updateJobs({ type: 'add_narrow_profile', payload: '' })
         case 'reset':
            return () => {
               const result = confirm('Are you sure?')
               if (result) updateJobs({ type: 'reset', payload: '' })
            }
         case 'send_task':
            // return () => services.send_task(currentTask.value, period)
            return () => {
               console.log('send task')
            }
         default:
            return
      }

      // case 'save':
      //    return () => services.save(period, jobs)
      // case 'download':
      //    return (e: ChangeEvent<HTMLInputElement>) => services.download(e, dispatch)
      // case 'upload':
      //    return () => services.upload()
      // case 'clean':
      //    return () => {
      //       const result = confirm('Are you sure?')
      //       if (result) dispatch(JobsActions.cleanCache())
      //    }
   }

   const getOptions = (type: string): { scale: string } => {
      switch (type) {
         case 'add_common':
            return { scale: '65%' }
         case 'add_narrow_profile':
            return { scale: '65%' }
         default:
            return { scale: '50%' }
      }
   }

   return (
      <div className={css.wrapper}>
         <nav className={css.nav}>
            {JC.NAV.map((b) => {
               const { name, type } = b
               const handler = actions(name)

               return (
                  <div key={name} style={{ position: 'relative' }}>
                     <Buttons.DashboardButton
                        style={{
                           backgroundImage: `url(/assets/images/svg/timereport-job-${name}.svg)`,
                           backgroundSize: getOptions(name).scale
                        }}
                        disabled={name === 'add_common' && isCommonTasks}
                        btn_type={type}
                        tooltip={{ message: staticTranslate(`dashboard.timereport-job-${name}`) }}
                        onClick={handler as () => void}
                        onChange={handler as () => void}
                     />
                     {name === 'add_calculated' && isCalcModal ? (
                        <CalcModal {...{ setisCalcModal, updateJobs, work_numbers }} />
                     ) : null}
                  </div>
               )
            })}
         </nav>
         <IconTooltip
            className={css.warning}
            image={'/assets/images/svg/timereport-job-warning.svg'}
            message={staticTranslate('dashboard.timereport-job-current-task')}
         />
         <Input
            className={css.task}
            type='s'
            value={currentTask.value}
            placeholder={staticTranslate('dashboard.timereport-job-placeholders-current')}
            onChange={(v) => setCurrentTask({ ...currentTask, value: v.target.value })}
         />
         <Buttons.DashboardButton
            style={{ backgroundImage: `url(/assets/images/svg/timereport-job-task-send.svg)` }}
            btn_type='icon-btn'
            tooltip={{ message: staticTranslate('dashboard.timereport-task-send') }}
            onClick={actions('send_task') as () => void}
         />
      </div>
   )
}

export default TimeNavigate
