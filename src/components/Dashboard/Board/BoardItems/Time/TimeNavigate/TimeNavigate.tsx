import { Buttons } from '@/components/UI/dashboard'
import { IconTooltip } from '@/components/UI/icon-tooltip/IconTooltip'
import { Input } from '@/components/UI/input/Input'
import { JC } from '@/constants/jobs'
import React, { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import css from './TimeNavigate.module.scss'

interface ITimeNavigate {
   updateJobs: any
   isCommonTasks: boolean
}

const TimeNavigate: FC<ITimeNavigate> = ({ updateJobs, isCommonTasks }) => {
   const [currentTask, setCurrentTask] = useState({ value: '', time: '' })
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })

   const actions = (type: string) => {
      switch (type) {
         case 'add':
            return () => updateJobs({ type: 'add', payload: '' })
         case 'add_common':
            return () => updateJobs({ type: 'add_common', payload: '' })
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

   return (
      <div className={css.wrapper}>
         <nav className={css.nav}>
            {JC.NAV.map((b) => {
               const { name, type } = b
               const handler = actions(name)

               return (
                  <Buttons.DashboardButton
                     style={{
                        backgroundImage: `url(/assets/images/svg/timereport-job-${name}.svg)`,
                        backgroundSize: name === 'add_common' ? '65%' : '50%'
                     }}
                     key={name}
                     disabled={name === 'add_common' && isCommonTasks}
                     btn_type={type}
                     tooltip={{ message: staticTranslate(`dashboard.timereport-job-${name}`) }}
                     onClick={handler as () => void}
                     onChange={handler as () => void}
                  />
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
