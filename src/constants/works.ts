import { CSSProperties } from 'react'

export type WorkStatusType = 'DONE' | 'UNDER REVIEW' | 'CANCEL' | 'IN PROGRESS' | 'PLANNED'
export type CurrencyType = 'USD' | 'UAH' | 'EUR'
export type WorkCompanyType = 'EXTERNAL' | 'INTERNAL'
export type CellTypes = 'dropdown' | 'input'

interface FIXED_POSITION {
   work_number: number
   name_of_vessel: string
   name_of_work: string
   IMO: number | null
}

export interface CALC_POSITIONS {
   salary_currency: number
   cost_ratio_currency: number
   cost_per_hour_currency: number
   estimated_net_cost_currency: number
   with_expenses: number
   calculated_agreement_cost_currency: number
   profitability: number
   actual_net_cost_currency: number
   actual_profitability: string
   IMO: number | null
}

interface SCROLL_POSITION extends CALC_POSITIONS {
   rate_usd_currency: number
   agreement_currency: CurrencyType
   name_of_company: string
   name_of_company_locale: WorkCompanyType
   coef_usd: number
   work_status: WorkStatusType
   salary_usd: number
   travelling_expenses_currency: number
   outsourcing_approval_expenses_currency: number
   bakshish_currency: number
   estimated_working_hours: number
   agreement_cost_currency: number
   start_of_work: string
   end_of_work: string
   contractor: string
   invoice_no: string
   payment_sum: number
   date_paid: string
   actual_working_hours: number
}

export type DESIGN_WORK_PROPS = Partial<FIXED_POSITION & SCROLL_POSITION & { id: string }>

export type ALL_WORKS_PROPS = Array<DESIGN_WORK_PROPS>

type ColumnNamesType = (string | Record<string, string[]>)[]

export const FIXED_VALUES: ColumnNamesType = ['work_number', 'name_of_vessel', 'IMO', 'name_of_work']

export const CALCVAL: Array<keyof CALC_POSITIONS> = [
   'salary_currency',
   'cost_ratio_currency',
   'cost_per_hour_currency',
   'estimated_net_cost_currency',
   'with_expenses',
   'calculated_agreement_cost_currency',
   'profitability',
   'actual_net_cost_currency',
   'actual_profitability',
   'IMO'
]

export const SCROLL_VALUES: ColumnNamesType = [
   'name_of_company',
   'name_of_company_locale',
   'agreement_currency',
   'rate_usd_currency',
   'coef_usd',
   'salary_usd',
   'salary_currency',
   'cost_ratio_currency',
   'cost_per_hour_currency',
   'travelling_expenses_currency',
   'outsourcing_approval_expenses_currency',
   'bakshish_currency',
   { estimated: ['estimated_working_hours', 'estimated_net_cost_currency'] },
   'with_expenses',
   'calculated_agreement_cost_currency',
   'agreement_cost_currency',
   'profitability',
   'work_status',
   'start_of_work',
   'end_of_work',
   'contractor',
   'invoice_no',
   'payment_sum',
   'date_paid',
   { actual: ['actual_working_hours', 'actual_net_cost_currency', 'actual_profitability'] }
]

export const DROPDOWN_OPTIONS = {
   work_status: ['PLANNED', 'IN PROGRESS', 'UNDER REVIEW', 'DONE', 'CANCEL'],
   agreement_currency: ['USD', 'EUR', 'UAH'],
   work_location: ['INTERNAL', 'EXTERNAL']
}

type FieldType = 'number' | 'text' | 'dot_number' | 'date_picker' | 'dropdown'
export type FieldOptionsType = CSSProperties & { type?: FieldType }

const OPTIONS: Record<string, FieldOptionsType> = {
   work_number: { type: 'number' },
   name_of_vessel: { width: '220px', type: 'dropdown' },
   rate_usd_currency: { type: 'dot_number' },
   coef_usd: { type: 'dot_number' },
   name_of_company: { width: '220px' },
   agreement_currency: { type: 'dropdown' },
   work_status: { type: 'dropdown' },
   payment_sum: { type: 'dot_number' },
   salary_usd: { type: 'dot_number' },
   travelling_expenses_currency: { type: 'dot_number' },
   outsourcing_approval_expenses_currency: { type: 'dot_number' },
   bakshish_currency: { type: 'dot_number' },
   actual_working_hours: { type: 'dot_number' },
   estimated_working_hours: { type: 'dot_number' },
   start_of_work: { type: 'date_picker' },
   end_of_work: { type: 'date_picker' },
   agreement_cost_currency: { type: 'dot_number' }
}

export const COLUMNS_D = { FIXED_VALUES, SCROLL_VALUES, OPTIONS }

export const COLORS = {
   white: ['#fff', '#000'],
   green: ['#7bb801', '#fff'],
   red: ['#c02901', '#fff'],
   yellow: ['#ddd60b', '#000'],
   sky: ['#0bddbd', '#fff'],
   grey: ['#8d8d8d', '#fff'],
   hover: ['#ebebeb7d', '#000']
}

export const empty_placeholders = {
   name_of_vessel: '--name of vessel--'
}

export type GlobalWorksTypes = 'design' | 'engineering' | 'supply' | 'utm'

export const WorksTypes = ['design', 'engineering', 'supply', 'utm'] as const
export const Tabs = ['vessels', 'design', 'engineering', 'supply', 'utm'] as const

export interface Vessel {
   ID?: number
   name_of_vessel: string
   IMO: number | ''
   imo_frozen?: boolean
}
