export type WorkStatusType = 'DONE' | 'UNDER REVIEW' | 'CANCEL' | 'IN PROGRESS' | 'PLANNED'
export type CurrencyType = 'USD' | 'UAH' | 'EUR'
export type WorkCompanyType = 'external' | 'internal'

interface Base {
   work_number: number
   name_of_vessel: string
   IMO: number | null
   name_of_work: string
   name_of_company: {
      name: string
      type: WorkCompanyType
   }
   agreement_currency: CurrencyType
   rate_usd: number
   coef_usd: number
   work_status: WorkStatusType
   agreement_cost_currency: number
}

export interface DESIGN extends Base {
   salary_usd: number
   salary_currency: number
   cost_ratio_currency: number
   cost_per_currency: number
   travelling_expenses_currency: number
   outsourcing_approval_expenses_currency: number
   bakshish_currency: number
   estimated: {
      working_hours: number
      net_cost_currency: number
   }
   with_expenses: number
   calculated_agreement_cost_currency: number
   profitability: number
   start_of_work: Date
   end_of_work: Date
   contractor: string
   invoice_no: string
   payment_sum: number
   date_paid: Date
   actual: {
      working_hours: number
      net_cost_currency: number
      profitability: string
   }
}

export interface ENGINEERING extends Base {
   executer: string
}
