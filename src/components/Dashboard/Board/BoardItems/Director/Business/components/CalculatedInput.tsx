import { DESIGN_WORK_PROPS, WorksTypes } from '@/constants/works'
import { useGetCurrencyRateQuery } from '@/store/reducers/apiReducer'
import React, { CSSProperties, FC, useMemo } from 'react'
import { Table } from '.'
import { Calculations } from '../calculations'
import css from '../tabs/Tabs.module.scss'
import { useGetParticipantsByTypeQuery } from '@/store/reducers/participantApiReducer'

const CalculatedInput: FC<{
   options: CSSProperties
   wt: keyof DESIGN_WORK_PROPS
   localWorks: DESIGN_WORK_PROPS
   customValue?: string
   table_type?: (typeof WorksTypes)[number]
}> = ({ options, wt, localWorks, customValue, table_type }) => {
   const { data: rate } = useGetCurrencyRateQuery({ pair: ['USD', localWorks.agreement_currency] })
   const { data: vessels } = useGetParticipantsByTypeQuery({ type: 'vessel' })
   const calc = useMemo(() => new Calculations(localWorks).calculate(vessels, table_type), [rate, vessels, localWorks])
   const value = !calc[wt] ? '-' : calc[wt]

   return (
      <div className={css.input_wrapper} style={options?.[1] as Record<string, string>}>
         <Table.StaticInput value={customValue ?? value} />
      </div>
   )
}

export default CalculatedInput
