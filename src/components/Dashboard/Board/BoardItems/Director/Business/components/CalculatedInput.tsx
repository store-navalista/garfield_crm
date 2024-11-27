import { DESIGN_WORK_PROPS } from '@/constants/works'
import { useGetCurrencyRateQuery } from '@/store/reducers/apiReducer'
import { useGetVesselsQuery } from '@/store/reducers/businessApiReducer'
import React, { CSSProperties, FC, useMemo } from 'react'
import { Table } from '.'
import { Calculations } from '../calculations'
import css from '../tabs/Tabs.module.scss'

const CalculatedInput: FC<{
   options: CSSProperties
   wt: keyof DESIGN_WORK_PROPS
   localWorks: DESIGN_WORK_PROPS
   customValue?: string
}> = ({ options, wt, localWorks, customValue }) => {
   const { data: rate } = useGetCurrencyRateQuery({ pair: ['USD', localWorks.agreement_currency] })
   const { data: vessels } = useGetVesselsQuery()
   const calc = useMemo(
      () => new Calculations(localWorks).calculate(vessels),
      [
         rate,
         vessels,
         localWorks.travelling_expenses_currency,
         localWorks.outsourcing_approval_expenses_currency,
         localWorks.bakshish_currency,
         localWorks.estimated_working_hours,
         localWorks.salary_usd,
         localWorks.agreement_cost_currency,
         localWorks.name_of_vessel,
         localWorks.coef_usd,
         localWorks.rate_usd_currency,
         localWorks.actual_working_hours
      ]
   )

   const value = !calc[wt] ? '-' : calc[wt]

   return (
      <div className={css.input_wrapper} style={options?.[1] as Record<string, string>}>
         <Table.StaticInput value={customValue ?? value} />
      </div>
   )
}

export default CalculatedInput
