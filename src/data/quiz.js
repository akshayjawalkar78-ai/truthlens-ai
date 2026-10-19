export const QUIZ_QUESTIONS = [
  {
    id: "quiz-1",
    scenario: "Summer Lifeguard Job",
    question: "For tax year 2024, Maya is 17 and earned $3,200 in W-2 wages, with $210 in Box 2. Assume she had no other income or special filing triggers. Which statement is most accurate?",
    options: [
      "No, and she shouldn't file because her parents already claim her.",
      "Based on these facts alone, she generally would not be required to file, but filing may let her claim a refund of federal income tax withheld.",
      "Yes, because anyone with a W-2 is legally required to file under federal law.",
      "No, because minors are legally exempt from all federal income taxes."
    ],
    correctIndex: 1,
    explanation: "For 2024, these wages alone were below the applicable earned-income filing threshold for a dependent. Other income or special rules can change the result. If her final federal income tax is less than the $210 withheld, filing a return is generally how she would claim the overpayment; the exact refund depends on the complete return.",
    sourceTitle: "IRS Publication 501: Who Must File",
    sourceUrl: "https://www.irs.gov/publications/p501"
  },
  {
    id: "quiz-2",
    scenario: "Neighborhood Math Tutoring",
    question: "Jordan had $1,100 of net profit from tutoring classmates in geometry. His clients paid him directly, with no tax withheld. Which statement is most accurate?",
    options: [
      "He owes nothing because you only pay taxes on money reported on a W-2.",
      "Net self-employment earnings of $400 or more generally trigger a federal filing requirement and self-employment tax; other rules may apply.",
      "He only needs to consider taxes if he receives a W-2.",
      "He must ask his school to issue a Form 1099 before he can report any earnings."
    ],
    correctIndex: 1,
    explanation: "Net earnings from self-employment of $400 or more generally require filing a federal return and calculating self-employment tax. A 1099 is not required to report income. The standard self-employment tax rate is 15.3%, subject to applicable rules and exceptions.",
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
      "No. A dependent may file their own return when required or to claim a refund, and should accurately indicate whether another taxpayer can claim them.",
      "No, but only if Liam pays rent to his parents."
    ],
    correctIndex: 2,
    explanation: "A person who qualifies as someone else's dependent can still file their own federal return. Filing status and whether a return is required depend on that person's complete facts and the tax year. The return must correctly answer whether someone can claim them.",
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
    explanation: "A refund occurs when payments and refundable credits exceed total tax. Withholding is one possible payment, but the question does not establish the exact source of Chloe's refund.",
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
