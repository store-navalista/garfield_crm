import { Input } from '@/components/UI/input/Input'
import { COMMON_CELL } from '@/constants/dashboard'
import { IJob } from '@/constants/jobs'
import useHover from '@/hooks/useHover'
import translate from '@/i18n/translate'
import React, { CSSProperties, FC, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import TimeService from '../services'
import css from './TimeJob.module.scss'
import WorkedTime from './WorkedTime'
import Services from './services'

interface ITimeJob {
   j: IJob
   days: ReturnType<TimeService['getDaysOfMonth']>
   index: number
   updateJobs: any
   isCommonTasks: any
}

const TimeJob: FC<ITimeJob> = ({ j, days, index, updateJobs, isCommonTasks }) => {
   const ref = useRef(null)
   const isHover = useHover(ref)
   const staticTranslate = (id: string) => useIntl().formatMessage({ id: id, defaultMessage: id })
   const isCommonJob = j.project_number === COMMON_CELL

   const { hours_worked } = j

   const [isTimingOpen, setisTimingOpen] = useState(undefined)

   const fields = [
      {
         field: 'project_number',
         styles: { textAlign: 'center' },
         options: { ph: '3240010' }
      },
      { field: 'ship_name', options: { ph: 'CHELSEA-2' } },
      {
         field: 'job_description',
         options: { ph: 'DG INSTALLATION DESIGN' }
      }
   ]

   const sum = j.hours_worked.length ? hours_worked.reduce((acc, current) => (current > 0 ? acc + current : acc), 0) : 0

   const margin = index === 0 ? '25px' : index === 0 || (index === 1 && isCommonTasks) ? '30px' : '20px'
   const comments = isCommonJob ? new Services({ job_description: j.job_description }).unpackComments() : null

   return (
      <div className={css.job} style={{ marginTop: margin }}>
         <div className={css.desc}>
            <button ref={ref} className={css.remove} onClick={() => updateJobs({ type: 'remove', payload: index })} />
            {j.project_number !== COMMON_CELL ? (
               fields.map((f) => {
                  const { field, styles, options } = f

                  return (
                     <div className={css.inputs} key={field}>
                        {index === 0 || (index === 1 && isCommonTasks) ? (
                           <span>{translate(`dashboard.timereport-job-${field}`)}</span>
                        ) : null}
                        <Input
                           type='l'
                           className={css.job_name}
                           style={styles as CSSProperties}
                           value={j[field]}
                           placeholder={options.ph}
                           onChange={(e) => updateJobs({ type: field, payload: { val: e.target.value, index } })}
                        />
                     </div>
                  )
               })
            ) : (
               <div className={css.inputs + ' ' + css.fill}>
                  <span>{translate('dashboard.timereport-job-common-tasks')}</span>
                  <Input
                     type='l'
                     className={css.job_name}
                     value={staticTranslate('dashboard.timereport-job-common-tasks')}
                     disabled
                  />
               </div>
            )}
            <p>{sum}</p>
         </div>
         <ul style={{ opacity: isHover ? 0.3 : 1 }}>
            {days.map((_, i) => {
               const serv = new Services({ type: hours_worked[i] })
               const WorkedTimeProps = { j, i, days, updateJobs, index, colors: serv.getColors(), setisTimingOpen }
               let style = serv.getStyle()
               if (_.day_of) style = { ...style, '--borderColor': serv.getColors()[0] }

               return (
                  <li style={style as CSSProperties} key={i}>
                     <button onClick={() => setisTimingOpen(i)}>{hours_worked[i] > 0 ? hours_worked[i] : ''}</button>
                     {isCommonJob && comments[i] ? <span className={css.indicator} /> : null}
                     {isTimingOpen === i ? <WorkedTime {...WorkedTimeProps} /> : null}
                     {isCommonJob && comments[i] ? (
                        <div className={css.comments_tip}>
                           <span className={css.triangle} />
                           <p>{comments[i]}</p>
                        </div>
                     ) : null}
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default TimeJob
