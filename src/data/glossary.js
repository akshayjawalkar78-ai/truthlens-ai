export const GLOSSARY_TERMS = [
  {
    id: "gross-income",
    term: "Gross Income",
    definition: "The total amount of income before certain adjustments and deductions. Gross income on a tax return can include more than wages; paycheck gross pay is wages before payroll deductions.",
    whyItMatters: "Gross income, adjusted gross income, and taxable income are different amounts used for different tax rules.",
    example: "If you work 20 hours at $15/hour, your gross pay is $300, even if your direct deposit is only $265.",
    sourceTitle: "IRS Publication 17 (Your Federal Income Tax)",
    sourceUrl: "https://www.irs.gov/publications/p17",
    taxYear: "2024 / 2025"
  },
  {
    id: "take-home-pay",
    term: "Take-Home Pay (Net Pay)",
    definition: "The amount paid to you after the deductions and withholdings on that paycheck are subtracted from gross pay.",
    whyItMatters: "This is your real spending and savings budget. Understanding deductions helps explain why net pay is lower than your hourly rate times hours worked.",
    example: "Gross earnings of $400 minus $30 federal tax, $24.80 Social Security, and $5.80 Medicare leaves $339.40 take-home pay.",
    sourceTitle: "IRS Topic No. 751: Social Security and Medicare Withholding Rates",
    sourceUrl: "https://www.irs.gov/taxtopics/tc751",
    taxYear: "2024 / 2025"
  },
  {
    id: "federal-withholding",
    term: "Federal Income Tax Withholding",
    definition: "Money your employer sends directly to the IRS on your behalf from each paycheck as an estimated prepayment toward your annual tax liability.",
    whyItMatters: "Withholding is a prepayment. Your annual return reconciles payments, credits, and total tax; withholding alone does not determine a refund.",
    example: "Box 2 of your Form W-2 reports the cumulative federal income tax withheld over the entire calendar year.",
    sourceTitle: "IRS Tax Withholding Estimator Guide",
    sourceUrl: "https://www.irs.gov/individuals/tax-withholding-estimator",
    taxYear: "2024 / 2025"
  },
  {
    id: "w2-form",
    term: "Form W-2 (Wage and Tax Statement)",
    definition: "An annual wage statement that an employer generally furnishes by January 31 of the following year, with wages and certain taxes withheld. Exceptions and timing rules can apply.",
    whyItMatters: "You cannot accurately file your federal or state return without the numbers from Box 1 (wages) and Box 2 (federal tax withheld).",
    example: "If you worked at a movie theater and a coffee shop in the same year, you will receive two separate W-2 forms.",
    sourceTitle: "IRS About Form W-2",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
    taxYear: "2024 / 2025"
  },
  {
    id: "1099-form",
    term: "Form 1099 (1099-NEC / 1099-MISC)",
    definition: "An information return used to report certain payments, such as nonemployee compensation. Receiving or not receiving a 1099 does not by itself determine whether income is taxable.",
    whyItMatters: "Independent-work income may have no regular payroll withholding and can be subject to income and self-employment taxes. The work relationship and net earnings matter.",
    example: "If you earned $900 tutoring neighborhood kids or delivering food via an app, you may receive a Form 1099-NEC.",
    sourceTitle: "IRS Independent Contractor (Self-Employed) or Employee?",
    sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee",
    taxYear: "2024 / 2025"
  },
  {
    id: "dependent",
    term: "Dependent",
    definition: "A person who meets the IRS tests to be claimed as a qualifying child or qualifying relative. The tests differ; age, relationship, residency, support, and income may matter.",
    whyItMatters: "A dependent may still file a separate return. Dependency and filing requirements are separate questions and depend on the person's full facts and tax year.",
    example: "A student living with a parent may meet some qualifying-child tests, but the IRS tests and the full household facts determine whether the parent can claim them.",
    sourceTitle: "IRS Publication 501: Dependents, Standard Deduction, and Filing Information",
    sourceUrl: "https://www.irs.gov/publications/p501",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-return",
    term: "Tax Return (Form 1040)",
    definition: "A set of forms filed with the IRS to report income, deductions, credits, payments, and calculate tax for a year. Form 1040 is the main individual federal return.",
    whyItMatters: "Filing may be required, or may let you claim a refund or tax benefits. Whether you must file depends on income, income type, filing status, and tax-year rules.",
    example: "A return compares total tax with withholding and other payments; it can show a refund, a balance due, or no balance either way.",
    sourceTitle: "IRS Free File: Do Your Taxes for Free",
    sourceUrl: "https://www.irs.gov/file-your-taxes-for-free",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-refund",
    term: "Tax Refund",
    definition: "An amount returned when payments and refundable credits exceed the tax owed for the year.",
    whyItMatters: "Withholding is one possible payment, but refundable credits and other payments can also affect a refund. A refund is not a filing requirement determination.",
    example: "If total tax is $50 and payments plus refundable credits total $180, the return may show a $130 refund, assuming no other adjustments.",
    sourceTitle: "IRS Where's My Refund?",
    sourceUrl: "https://www.irs.gov/refunds",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-liability",
    term: "Tax Liability",
    definition: "The total tax owed for a tax year after applying the tax rules and relevant credits.",
    whyItMatters: "A return compares total tax with withholding, estimated payments, and refundable credits to determine a refund or balance due.",
    example: "If your tax liability is $50 and your employer withheld $80, you receive a $30 refund.",
    sourceTitle: "IRS Publication 17: Your Federal Income Tax",
    sourceUrl: "https://www.irs.gov/publications/p17",
    taxYear: "2024 / 2025"
  },
  {
    id: "deduction",
    term: "Standard Deduction",
    definition: "A tax deduction amount that reduces income subject to tax. The amount depends on filing status and tax year; dependents have special rules.",
    whyItMatters: "A deduction can reduce taxable income, but it does not by itself determine filing requirements or total tax. Check the current year's IRS rules.",
    example: "A deduction reduces the income used in a tax calculation. The resulting tax depends on the applicable rates, credits, and other income.",
    sourceTitle: "IRS Publication 501: Standard Deduction for Dependents",
    sourceUrl: "https://www.irs.gov/publications/p501",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-credit",
    term: "Tax Credit",
    definition: "An amount that reduces tax. A refundable credit may be paid in part beyond tax owed; a nonrefundable credit generally cannot reduce regular tax below zero.",
    whyItMatters: "Credit eligibility, amounts, and refundable status vary by credit and tax year.",
    example: "A $200 tax credit wipes out a $200 tax bill completely, whereas a $200 deduction only reduces your taxable income by $200.",
    sourceTitle: "IRS Tax Credits and Deductions for Individuals",
    sourceUrl: "https://www.irs.gov/credits-deductions-for-individuals",
    taxYear: "2024 / 2025"
  },
  {
    id: "self-employment-tax",
    term: "Self-Employment Tax (SECA)",
    definition: "A Social Security and Medicare tax that generally applies to self-employment earnings. The 15.3% rate generally applies to 92.35% of net earnings, not gross payments; limits and special rules can change the calculation.",
    whyItMatters: "Net self-employment earnings of $400 or more generally mean you must file a federal return and pay self-employment tax. Income tax and self-employment tax are separate calculations.",
    example: "A freelancer's net profit is not the same as gross payments. Ordinary and necessary business expenses affect net earnings, and the IRS generally applies the 15.3% rate to 92.35% of those net earnings.",
    sourceTitle: "IRS Self-Employment Tax (Social Security and Medicare Taxes)",
    sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
    taxYear: "General concept; check current IRS rules"
  },
  {
    id: "social-security-tax",
    term: "Social Security Tax (OASDI)",
    definition: "The employee share of Social Security payroll tax is generally 6.2% of covered wages, up to the annual wage base. Some employment exceptions apply.",
    whyItMatters: "Age or dependent status alone does not exempt most employees, but not every job is subject to the same payroll-tax rules.",
    example: "On a $200 paycheck, exactly $12.40 is withheld for Social Security.",
    sourceTitle: "IRS Topic No. 751: Social Security and Medicare Withholding Rates",
    sourceUrl: "https://www.irs.gov/taxtopics/tc751",
    taxYear: "2024 / 2025"
  },
  {
    id: "medicare-tax",
    term: "Medicare Tax (Hospital Insurance)",
    definition: "The employee share of Medicare payroll tax is generally 1.45% of covered wages. Additional Medicare Tax may apply above a tax-year threshold.",
    whyItMatters: "Together with the standard employee Social Security rate, these are commonly called FICA taxes. Exceptions and additional taxes can apply.",
    example: "On a $200 paycheck, exactly $2.90 is withheld for Medicare.",
    sourceTitle: "IRS Topic No. 751: Social Security and Medicare Withholding Rates",
    sourceUrl: "https://www.irs.gov/taxtopics/tc751",
    taxYear: "2024 / 2025"
  }
];
