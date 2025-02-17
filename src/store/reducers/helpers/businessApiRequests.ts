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

const SupplyFullQueryResult = `
${Base}
executor
contract_price_currency
price_for_supplier
margin
expected_expenses
delivery_expenses
expected_commission
date_started
advance_payment
invoice_no
date_paid
final_payment
date_of_delivery
`

const UTMFullQueryResult = `
${Base}
executor
agreement_cost_utm_currency
agreement_cost_supervision_currency
utm_extra_day_cost_currency
day_utm_started
day_utm_finished
day_supervision_started
day_supervision_finished
day_extra_days_started
day_extra_days_finished
travelling_expenses_currency
accomodation_expenses_currency
other_expenses_currency
bakshish_currency
supervision_cost_total_currency
extra_days_cost_total_currency
total_cost_with_currency
total_cost_with_expenses_currency
salary
contractor
invoice_no
payment_sum
date_paid
`

const getAllBusinessWorkByTypeRequest = `
query GetAllBusinessWorkByType($type: String!) {
    getAllBusinessWorkByType(type: $type) {
        ... on BusinessWorkDesign {
            ${DesignFullQueryResult}
        }
        ... on BusinessWorkEngineering {
            ${EngineeringFullQueryResult}
        }
        ... on BusinessWorkSupply {
            ${SupplyFullQueryResult}
        }
        ... on BusinessWorkUTM {
            ${UTMFullQueryResult}
        }              
    }
}
`

export const businessApiRequests = {
   getAllBusinessWorkByTypeRequest
}
