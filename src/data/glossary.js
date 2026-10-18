export const GLOSSARY_TERMS = [
  {
    id: "gross-income",
    term: "Gross Income",
    definition: "The total amount of money you earn before any taxes, retirement contributions, or other paycheck deductions are taken out.",
    whyItMatters: "Tax brackets, filing requirements, and benefits are calculated based on gross income formulas, not what lands in your bank account.",
    example: "If you work 20 hours at $15/hour, your gross pay is $300, even if your direct deposit is only $265.",
    sourceTitle: "IRS Publication 17 (Your Federal Income Tax)",
    sourceUrl: "https://www.irs.gov/publications/p17",
    taxYear: "2024 / 2025"
  },
  {
    id: "take-home-pay",
    term: "Take-Home Pay (Net Pay)",
    definition: "The actual amount of cash you receive on payday after all federal, state, and payroll withholdings are subtracted.",
    whyItMatters: "This is your real spending and savings budget. Understanding deductions helps explain why net pay is lower than your hourly rate times hours worked.",
    example: "Gross earnings of $400 minus $30 federal tax, $24.80 Social Security, and $5.80 Medicare leaves $339.40 take-home pay.",
    sourceTitle: "Consumer Financial Protection Bureau — Understanding Your Paycheck",
    sourceUrl: "https://www.consumerfinance.gov",
    taxYear: "2024 / 2025"
  },
  {
    id: "federal-withholding",
    term: "Federal Income Tax Withholding",
    definition: "Money your employer sends directly to the IRS on your behalf from each paycheck as an estimated prepayment toward your annual tax liability.",
    whyItMatters: "If too much is withheld throughout the year, you get a refund when you file. If too little is withheld, you may owe the difference.",
    example: "Box 2 of your Form W-2 reports the cumulative federal income tax withheld over the entire calendar year.",
    sourceTitle: "IRS Tax Withholding Estimator Guide",
    sourceUrl: "https://www.irs.gov/individuals/tax-withholding-estimator",
    taxYear: "2024 / 2025"
  },
  {
    id: "w2-form",
    term: "Form W-2 (Wage and Tax Statement)",
    definition: "An annual tax statement that your employer must send you by January 31 showing exactly how much you earned and how much tax was withheld.",
    whyItMatters: "You cannot accurately file your federal or state return without the numbers from Box 1 (wages) and Box 2 (federal tax withheld).",
    example: "If you worked at a movie theater and a coffee shop in the same year, you will receive two separate W-2 forms.",
    sourceTitle: "IRS About Form W-2",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
    taxYear: "2024 / 2025"
  },
  {
    id: "1099-form",
    term: "Form 1099 (1099-NEC / 1099-MISC)",
    definition: "A tax document used for independent contractors, freelancers, and gig workers who earn money without standard employee tax withholding.",
    whyItMatters: "Unlike W-2 jobs, employers do NOT take taxes out of 1099 payments. You are responsible for paying both income tax and self-employment tax yourself.",
    example: "If you earned $900 tutoring neighborhood kids or delivering food via an app, you may receive a Form 1099-NEC.",
    sourceTitle: "IRS Independent Contractor (Self-Employed) or Employee?",
    sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee",
    taxYear: "2024 / 2025"
  },
  {
    id: "dependent",
    term: "Dependent",
    definition: "A person (often a child, teen, or full-time student under age 24) who relies on a parent or guardian for more than half of their financial support.",
    whyItMatters: "Being claimed as a dependent DOES NOT prevent you from filing your own tax return. However, it changes your standard deduction and filing thresholds.",
    example: "A 17-year-old living at home whose parents pay for housing and food is typically claimed as a dependent, but can still file to claim a refund of withheld taxes.",
    sourceTitle: "IRS Publication 501: Dependents, Standard Deduction, and Filing Information",
    sourceUrl: "https://www.irs.gov/publications/p501",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-return",
    term: "Tax Return (Form 1040)",
    definition: "The official form you submit annually to the IRS reconciling all your earnings for the year against the taxes you already prepaid.",
    whyItMatters: "Filing a return is the only legal way to receive a refund of taxes withheld from your paychecks if you earned below the filing threshold.",
    example: "Filing your Form 1040 by April 15 reports $4,000 earned and requests back the $250 your employer withheld in Box 2.",
    sourceTitle: "IRS Free File: Do Your Taxes for Free",
    sourceUrl: "https://www.irs.gov/file-your-taxes-for-free",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-refund",
    term: "Tax Refund",
    definition: "A reimbursement from the government returning money that you overpaid in paycheck withholding throughout the year.",
    whyItMatters: "A refund is NOT free bonus money or lottery winnings—it was already your money that was held interest-free by the treasury.",
    example: "If your calculated tax bill for the year is $0 because you earned under the threshold, but $180 was withheld, your refund is $180.",
    sourceTitle: "IRS Where's My Refund?",
    sourceUrl: "https://www.irs.gov/refunds",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-liability",
    term: "Tax Liability",
    definition: "The actual total dollar amount of income tax you legally owe to the government based on your taxable income.",
    whyItMatters: "Your refund or bill is calculated as: (Total Withholding Paid) minus (Actual Tax Liability).",
    example: "If your tax liability is $50 and your employer withheld $80, you receive a $30 refund.",
    sourceTitle: "IRS Tax Topic 551: Basis of Assets and Tax Computation",
    sourceUrl: "https://www.irs.gov/taxtopics",
    taxYear: "2024 / 2025"
  },
  {
    id: "deduction",
    term: "Standard Deduction",
    definition: "A specific dollar amount that reduces your total income before taxes are calculated, making that portion of your earnings completely tax-free.",
    whyItMatters: "For dependents, the standard deduction is calculated based on earned income plus $450 (up to the single maximum), shielding teen wages from federal income tax.",
    example: "If you earned $3,500 at a retail store, your standard deduction eliminates all federal income tax liability on those wages.",
    sourceTitle: "IRS Publication 501: Standard Deduction for Dependents",
    sourceUrl: "https://www.irs.gov/publications/p501",
    taxYear: "2024 / 2025"
  },
  {
    id: "tax-credit",
    term: "Tax Credit",
    definition: "A dollar-for-dollar reduction of your actual tax liability, which is more valuable than a deduction because it directly reduces the taxes owed.",
    whyItMatters: "Some credits (refundable credits) can even generate cash back to you even if your tax liability is zero.",
    example: "A $200 tax credit wipes out a $200 tax bill completely, whereas a $200 deduction only reduces your taxable income by $200.",
    sourceTitle: "IRS Tax Credits and Deductions for Individuals",
    sourceUrl: "https://www.irs.gov/credits-deductions-for-individuals",
    taxYear: "2024 / 2025"
  },
  {
    id: "self-employment-tax",
    term: "Self-Employment Tax (SECA)",
    definition: "A 15.3% tax composed of Social Security (12.4%) and Medicare (2.9%) that individuals working for themselves must pay on net business earnings of $400 or more.",
    whyItMatters: "Standard W-2 employers pay half of FICA taxes for you. When you do gig work or freelance, you must cover both the employee and employer shares.",
    example: "If you earn $1,200 as an independent freelance graphic designer, you owe approximately 15.3% in self-employment tax even if you owe $0 in federal income tax.",
    sourceTitle: "IRS Self-Employment Tax (Social Security and Medicare Taxes)",
    sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
    taxYear: "2024 / 2025"
  },
  {
    id: "social-security-tax",
    term: "Social Security Tax (OASDI)",
    definition: "A mandatory 6.2% payroll tax withheld from an employee's wages that funds federal retirement, disability, and survivor benefits.",
    whyItMatters: "This tax is deducted regardless of your age, whether you are a minor, or whether you are claimed as a dependent.",
    example: "On a $200 paycheck, exactly $12.40 is withheld for Social Security.",
    sourceTitle: "Social Security Administration — FICA Tax Rates",
    sourceUrl: "https://www.ssa.gov",
    taxYear: "2024 / 2025"
  },
  {
    id: "medicare-tax",
    term: "Medicare Tax (Hospital Insurance)",
    definition: "A mandatory 1.45% payroll tax withheld from employee wages that helps fund healthcare for Americans age 65 and older.",
    whyItMatters: "Together with Social Security (6.2%), Medicare makes up the 7.65% FICA deduction on almost all teen W-2 paychecks.",
    example: "On a $200 paycheck, exactly $2.90 is withheld for Medicare.",
    sourceTitle: "IRS Topic No. 751: Social Security and Medicare Withholding Rates",
    sourceUrl: "https://www.irs.gov/taxtopics/tc751",
    taxYear: "2024 / 2025"
  }
];
