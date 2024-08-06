import React, { CSSProperties, FC, useEffect } from 'react'
import css from '../Timing.module.scss'
import { JobProps } from '../Timing'
import { COMMON_CELL } from '@/constants/dashboard'
import Services from '../../../Time/TimeJob/services'

const Job: FC<JobProps> = ({ currentJob, days }) => {
   const { project_number, ship_name, job_description, hours_worked } = currentJob

   const getStyles = (val: number) => {
      switch (val) {
         case -0.5:
            return { backgroundImage: 'url(/assets/images/svg/timereport-days-dayof.svg)' }
         case -1:
            return { backgroundImage: 'url(/assets/images/svg/timereport-days-sick.svg)' }
         case -1.5:
            return { backgroundImage: 'url(/assets/images/svg/timereport-days-vac.svg)' }
         default:
            return { backgroundImage: '' }
      }
   }

   const sum = hours_worked.reduce((acc, current) => (current > 0 ? acc + current : acc), 0)
   const info = project_number !== COMMON_CELL ? [project_number, ship_name, job_description] : ['Common', '', '']
   const comments = new Services({ job_description }).unpackComments()

   return (
      <div className={css.row}>
         <p></p>
         {info.map((p, i) => (
            <p key={p + i}>{p}</p>
         ))}
         <div className={css.days}>
            {days.map((d, i) => {
               const { day } = d
               const haveComment = project_number === COMMON_CELL && comments[i]

               return (
                  <span style={getStyles(hours_worked[i]) as CSSProperties} key={day}>
                     {hours_worked[i] >= 1 ? hours_worked[i] : ''}
                     {haveComment ? (
                        <div className={css.comments_tip}>
                           <span className={css.triangle} />
                           <p>{comments[i]}</p>
                        </div>
                     ) : null}
                     {haveComment ? <div className={css.circle} /> : null}
                  </span>
               )
            })}
         </div>
         <p>{sum}</p>
      </div>
   )
}

export default Job
