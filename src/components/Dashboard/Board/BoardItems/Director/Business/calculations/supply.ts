import { empty_placeholders, Vessel, DESIGN_WORK_PROPS } from '@/constants/works'

// design calculations
export const supply = (vessels: Vessel[], works: DESIGN_WORK_PROPS) => {
   const r = (value: number) => Math.ceil(value)

   const {
      travelling_expenses_currency,
      outsourcing_approval_expenses_currency,
      bakshish_currency,
      estimated_working_hours,
      salary_usd,
      agreement_cost_currency,
      name_of_vessel,
      coef_usd,
      rate_usd_currency,
      actual_working_hours
   } = works

   const salary_currency = r(salary_usd * rate_usd_currency)
   const cost_ratio_currency = r(salary_currency * coef_usd)
   const cost_per_hour_currency = r((salary_currency + cost_ratio_currency) / 21 / 8)
   const estimated_net_cost_currency = r(estimated_working_hours * cost_per_hour_currency)
   const with_expenses =
      estimated_net_cost_currency +
      travelling_expenses_currency +
      outsourcing_approval_expenses_currency +
      bakshish_currency
   const calculated_agreement_cost_currency =
      estimated_net_cost_currency * 2 +
      bakshish_currency +
      travelling_expenses_currency +
      outsourcing_approval_expenses_currency
   const profitability = (((agreement_cost_currency - with_expenses) / agreement_cost_currency) * 100).toFixed(1)
   const actual_net_cost_currency =
      cost_per_hour_currency * actual_working_hours +
      travelling_expenses_currency +
      outsourcing_approval_expenses_currency +
      bakshish_currency
   const actual_profitability = (
      ((agreement_cost_currency - actual_net_cost_currency) / agreement_cost_currency) *
      100
   ).toFixed(1)
   const IMO = () => {
      if (!vessels) {
         return '--'
      }
      return name_of_vessel === empty_placeholders.name_of_vessel
         ? '--'
         : vessels.find((v) => v.name_of_vessel === name_of_vessel)?.IMO
   }

   return {
      salary_currency,
      cost_ratio_currency,
      cost_per_hour_currency,
      estimated_net_cost_currency,
      with_expenses,
      calculated_agreement_cost_currency,
      profitability: isNaN(+profitability) || !isFinite(+profitability) ? '-' : `${profitability}%`,
      actual_net_cost_currency,
      actual_profitability:
         isNaN(+actual_profitability) || !isFinite(+actual_profitability) ? '-' : `${actual_profitability}%`,
      IMO: IMO()
   }
}
