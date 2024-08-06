import { COMMON_CELL } from '@/constants/dashboard'
import { IJob } from '@/constants/jobs'
import useOutsideClick from '@/hooks/useOutsideClick'
import translate from '@/i18n/translate'
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import TimeService from '../services'
import Comments from './Comments'
import css from './TimeJob.module.scss'
import Services from './services'

interface ITimeJob {
   j: IJob
   days: ReturnType<TimeService['getDaysOfMonth']>
}

interface IWorkedTime extends ITimeJob {
   setisTimingOpen: React.Dispatch<React.SetStateAction<boolean>>
   i: number
   colors: string[]
   updateJobs: any
   index: number
}

const quick = [
   { index: -0.5, title: 'O', tooltip: 'dayof' },
   { index: -1, title: 'S', tooltip: 'sick' },
   { index: -1.5, title: 'V', tooltip: 'vacation' }
]

const getValue = (v: number) => {
   switch (v) {
      case -1.5:
         return 'V'
      case -1:
         return 'S'
      case -0.5:
         return 'O'
      default:
         return v
   }
}

const WorkedTime: FC<IWorkedTime> = ({ j, i, days, updateJobs, index, setisTimingOpen, colors }) => {
   const ref = useRef(null)
   const { hours_worked } = j
   const [isComments, setisComments] = useState(false)

   useOutsideClick(ref, () => setisTimingOpen(undefined))

   function updateScrollValue(e: React.WheelEvent<HTMLInputElement>) {
      const scrollDirection = e.deltaY > 0 ? (j.hours_worked[i] > -1.5 ? -0.5 : 0) : j.hours_worked[i] < 24 ? 0.5 : 0
      const correctValue = j.hours_worked[i] + scrollDirection
      const changedArr = [...hours_worked].with(i, correctValue)
      updateJobs({ type: 'hours_worked', payload: { val: changedArr, index } })
   }

   function updateValue(value: number) {
      const changedArr = [...hours_worked].with(i, value)
      updateJobs({ type: 'hours_worked', payload: { val: changedArr, index } })
      setisTimingOpen(false)
   }

   const { day, formatDay } = days[i]

   const { job_description } = j
   const serv = new Services({ job_description })
   const updateCommentsHandler = (val: string) => {
      const desc_stringify = serv.packComments(val, i)
      updateJobs({ type: 'job_description', payload: { val: desc_stringify, index } })
   }

   useEffect(() => {
      if (serv.unpackComments()[i]) setisComments(true)
   }, [job_description])

   return (
      <div ref={ref} className={css.time_used}>
         <div className={css.info}>
            <span>{`${formatDay} ${day}`}</span>
         </div>
         <div className={css.values}>
            <p>Values:</p>
            <div className={css.input} onWheel={updateScrollValue}>
               {getValue(j.hours_worked[i])}
            </div>
            {quick.map((val, i) => {
               const { index, title, tooltip } = val

               return (
                  <>
                     <button
                        style={{ '--local-color': colors[i] } as CSSProperties}
                        key={title}
                        onClick={() => updateValue(Number(index))}
                     >
                        {title}
                        <span className={css.tooltip}>
                           {translate(`dashboard.timereport-workedtime-tooltip-${tooltip}`)}
                        </span>
                     </button>
                  </>
               )
            })}
         </div>
         <div className={css.quick_btns}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
               <button onClick={() => updateValue(v)} key={v}>
                  {v}
               </button>
            ))}
         </div>
         <button onClick={() => setisTimingOpen(false)} className={css.apply} />
         {j.project_number === COMMON_CELL ? (
            <>
               <button
                  style={{
                     backgroundImage: `url(/assets/images/svg/custom-button-icon-${isComments ? 'minus' : 'plus'}.svg`
                  }}
                  onClick={() => setisComments(!isComments)}
                  className={css.add_comment}
               >
                  <span className={css.tooltip}>
                     {translate('dashboard.timereport-workedtime-tooltip-add-comments')}
                  </span>
               </button>
               {serv.unpackComments()[i] ? (
                  <button
                     onClick={() => {
                        updateCommentsHandler(null)
                        setisComments(false)
                     }}
                     className={css.remove_comment}
                  >
                     <span className={css.tooltip}>
                        {translate('dashboard.timereport-workedtime-tooltip-remove-comments')}
                     </span>
                  </button>
               ) : null}
            </>
         ) : null}
         {isComments ? <Comments i={i} serv={serv} updateCommentsHandler={updateCommentsHandler} /> : null}
      </div>
   )
}

export default WorkedTime
