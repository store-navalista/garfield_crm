import {
   CALC_POSITIONS,
   CALCVAL,
   DESIGN_WORK_PROPS,
   DROPDOWN_OPTIONS,
   empty_placeholders,
   FieldOptionsType
} from '@/constants/works'
import { useGetCurrencyRateQuery } from '@/store/reducers/apiReducer'
import { useGetVesselsQuery } from '@/store/reducers/businessApiReducer'
import React, { FC, memo, useMemo } from 'react'
import { Table } from '.'
import css from '../tabs/Tabs.module.scss'
import ActionButton from './ActionButton'
import CalculatedInput from './CalculatedInput'
import DatePickerElement from './DatePickerElement'
import { WorksStateType } from './Row'
import StaticInput from './StaticInput'

type ValueTemplateProps = {
   index: number
   wt: keyof DESIGN_WORK_PROPS
   options?: FieldOptionsType
} & WorksStateType

const ValueTemplate: FC<ValueTemplateProps> = ({ index, wt, options = {}, localWorks, setLocalWorks }) => {
   const { data: vessels } = useGetVesselsQuery()
   const vessels_names = useMemo(() => vessels?.map((v) => v.name_of_vessel), [vessels])
   const { data: rate, isLoading: isRateLoading } = useGetCurrencyRateQuery({
      pair: ['USD', localWorks.agreement_currency]
   })

   const getRate = () => {
      setLocalWorks((prevState) => ({
         ...prevState,
         rate_usd_currency: +Number(rate?.crossRate).toFixed(3)
      }))
   }

   const dropdown_options = (() => {
      if (wt === 'name_of_vessel' && vessels_names?.length) {
         vessels_names?.sort((a, b) => String(a).localeCompare(b))
         if (!vessels_names.includes(empty_placeholders.name_of_vessel)) {
            vessels_names.unshift(empty_placeholders.name_of_vessel)
         }
         return vessels_names
      }
      return DROPDOWN_OPTIONS[wt]
   })()

   if (options.type === 'dropdown') {
      return (
         <div key={index} className={css.input_wrapper} style={options?.[1] as Record<string, string>}>
            <Table.Dropdown
               {...{
                  wt,
                  options: dropdown_options,
                  localWorks,
                  setLocalWorks
               }}
            />
         </div>
      )
   }

   if (CALCVAL.includes(wt as keyof CALC_POSITIONS)) {
      return (
         <div key={index} className={css.input_wrapper}>
            <CalculatedInput {...{ options, wt, localWorks }} />
         </div>
      )
   }

   if (wt === 'actual_working_hours' && localWorks.work_status === 'DONE') {
      return (
         <div key={index} className={css.input_wrapper}>
            <StaticInput value={localWorks[wt]} />
         </div>
      )
   }

   if (options.type === 'date_picker') {
      if (wt === 'start_of_work') {
         const isStart = ['IN PROGRESS', 'UNDER REVIEW', 'DONE'].includes(localWorks.work_status)

         return isStart ? (
            <DatePickerElement {...{ wt, localWorks, setLocalWorks }} />
         ) : (
            <div key={index} className={css.input_wrapper}>
               <StaticInput value='--not started--' />
            </div>
         )
      }

      if (wt === 'end_of_work') {
         const isEnd = localWorks.work_status === 'DONE'
         return isEnd ? (
            <DatePickerElement {...{ wt, localWorks, setLocalWorks }} />
         ) : (
            <div key={index} className={css.input_wrapper}>
               <StaticInput value='--not finished--' />
            </div>
         )
      }
   }

   return (
      <div key={index} className={css.input_wrapper} style={options?.[1] as Record<string, string>}>
         <Table.Input {...{ wt, value: localWorks[wt] as string | number, onChangeHandle: setLocalWorks, options }} />
         {wt === 'rate_usd_currency' ? (
            <ActionButton button_type='rate' isLoading={isRateLoading} handler={getRate} />
         ) : null}
      </div>
   )
}

export default memo(ValueTemplate)