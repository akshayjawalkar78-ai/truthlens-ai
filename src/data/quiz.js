export const QUIZ_QUESTIONS = [
  {
    id: "quiz-1",
    scenario: "Summer Lifeguard Job",
    question: "Maya is 17 and worked as a lifeguard over the summer, earning $3,200. Her parents claim her as a dependent. Her W-2 shows $210 in Box 2 (Federal Income Tax Withheld). Does she need to file a tax return?",
    options: [
      "No, and she shouldn't file because her parents already claim her.",
      "She isn't legally required to file, but she should file to get her $210 refund back.",
      "Yes, because anyone with a W-2 is legally required to file under federal law.",
      "No, because minors are legally exempt from all federal income taxes."
    ],
    correctIndex: 1,
    explanation: "Maya earned below the dependent single filing threshold ($14,600 for earned income in 2024), so she has no legal obligation to file. However, because her employer withheld $210 from her paychecks, the ONLY way she can receive that $210 refund is by filing a return.",
    sourceTitle: "IRS Publication 501: Who Must File",
    sourceUrl: "https://www.irs.gov/publications/p501"
  },
  {
    id: "quiz-2",
    scenario: "Neighborhood Math Tutoring",
    question: "Jordan earned $1,100 tutoring classmates in geometry. His clients paid him directly via cash and peer-to-peer apps, with zero taxes withheld. What are his tax obligations?",
    options: [
      "He owes nothing because you only pay taxes on money reported on a W-2.",
      "He owes self-employment tax (15.3% for Social Security and Medicare) because net self-employment earnings exceeded $400.",
      "He only owes taxes if he made over $14,600.",
      "He must ask his school to issue a Form 1099 before he can report any earnings."
    ],
    correctIndex: 1,
    explanation: "Independent work, tutoring, and freelance jobs are subject to Self-Employment Tax (SECA). Under IRS rules, anyone with net self-employment earnings of $400 or more must file a tax return and pay Social Security and Medicare taxes, regardless of age or total income.",
    sourceTitle: "IRS Topic No. 554: Self-Employment Tax",
    sourceUrl: "https://www.irs.gov/taxtopics/tc554"
  },
  {
    id: "quiz-3",
    scenario: "Dependent Status & Filing",
    question: "Liam's older sister told him: 'If Mom and Dad claim you as a dependent on their tax return, you aren't allowed to file your own return.' Is she correct?",
    options: [
      "Yes, filing your own return cancels out your parents' dependent tax benefits.",
      "Yes, children under 18 can never file their own Form 1040.",
      "No, dependents can and often should file their own tax return; you just check the box stating someone can claim you as a dependent.",
      "No, but only if Liam pays rent to his parents."
    ],
    correctIndex: 2,
    explanation: "This is one of the most widespread tax misconceptions among teens. A dependent can always file their own Form 1040. On the tax return, there is a clear checkbox: 'Someone can claim: You as a dependent.' This ensures both returns are filed correctly without conflict.",
    sourceTitle: "IRS Publication 501: Dependents",
    sourceUrl: "https://www.irs.gov/publications/p501"
  },
  {
    id: "quiz-4",
    scenario: "Understanding Tax Refunds",
    question: "Chloe was excited to receive a $450 tax refund in her checking account. What does this refund actually represent?",
    options: [
      "A government bonus reward for being an employed student.",
      "Interest earned on the wages she deposited throughout the year.",
      "A return of her own money that was over-withheld from her paychecks.",
      "Free grant money provided by the state Department of Revenue."
    ],
    correctIndex: 2,
    explanation: "A tax refund is simply a repayment of your own money. When Chloe's employer deducted federal income tax from each paycheck, they were making estimated prepayments to the IRS. Since her actual annual tax bill was less than what was withheld, the IRS returned the excess.",
    sourceTitle: "IRS Where's My Refund Guide",
    sourceUrl: "https://www.irs.gov/refunds"
  },
  {
    id: "quiz-5",
    scenario: "Multiple W-2 Jobs",
    question: "During high school, Sam worked at a grocery store in the spring and an ice cream parlor in the summer. How should Sam prepare his tax return?",
    options: [
      "File two separate tax returns, one for each W-2 employer.",
      "Only report the job where he earned the most money.",
      "Combine the information from both W-2 forms onto a single Form 1040 tax return.",
      "Wait until next year so both jobs can be reported on a combined multi-year form."
    ],
    correctIndex: 2,
    explanation: "Taxpayers file only ONE federal Form 1040 per calendar year. If you had multiple jobs, you combine the wage totals from Box 1 of all W-2s and add together the withholding totals from Box 2 of all W-2s.",
    sourceTitle: "IRS Form 1040 Instructions",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-1040"
  }
];
