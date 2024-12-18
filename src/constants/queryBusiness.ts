import { GlobalWorksTypes } from './works'

const Base = `
id
work_number
name_of_vessel
name_of_work
agreement_currency
name_of_company
name_of_company_locale
rate_usd_currency
coef_usd
work_status
`

const DesignFullQueryResult = `
${Base}
salary_usd
travelling_expenses_currency
outsourcing_approval_expenses_currency
bakshish_currency
estimated_working_hours
agreement_cost_currency
start_of_work
end_of_work
contractor
invoice_no
payment_sum
date_paid
actual_working_hours
`

const EngineeringFullQueryResult = `
${Base}
executor
agreement_cost_currency
agreement_cost_of_work_day_person_currency
extra_day_cost_day_person_currency
day_started
day_finished
travelling_days_currency
accomodation_expenses_currency
other_expenses_currency
bakshish_currency
salary
contractor
invoice_no
payment_sum
date_paid
`

const PartA = `
id
work_number
name_of_vessel
name_of_work
work_status
`

export const getFullMultiBusinessByType = `
... on BusinessWorkDesign {
    ${DesignFullQueryResult}
}
... on BusinessWorkEngineering {
    ${EngineeringFullQueryResult}
}
`

export const getIDMultiBusinessByType = `
... on BusinessWorkDesign {
    id
}
... on BusinessWorkEngineering {
    id
}
`

export const getPartAMultiBusinessByType = `
... on BusinessWorkDesign {
    ${PartA}
}
... on BusinessWorkEngineering {
    ${PartA}
}
`
