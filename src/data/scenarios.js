export const PRELOADED_SCENARIOS = [
  {
    id: "summer-job-w2",
    title: "Summer Retail Job (W-2 Only)",
    subtitle: "High school student with part-time wages and tax withholding",
    badge: "W-2 Hourly",
    description: "Maya worked 15 hours a week at a bookstore during summer break. Her employer withheld federal income tax from every paycheck.",
    answers: {
      taxYear: "2024",
      incomeTypes: ["w2-wages"],
      documents: ["w2"],
      dependentStatus: "yes",
      multipleIncome: "no",
      state: "CA",
      uncertainties: []
    },
    mockData: {
      w2s: [
        {
          employer: "Pioneer City Bookstore LLC",
          ein: "XX-XXX4190",
          box1Wages: 3250.00,
          box2FedWithheld: 195.00,
          box3SocSecWages: 3250.00,
          box4SocSecTax: 201.50,
          box5MedWages: 3250.00,
          box6MedTax: 47.13,
          box16StateWages: 3250.00,
          box17StateTax: 45.00
        }
      ],
      selfEmploymentProfit: 0,
    }
  },
  {
    id: "tutoring-freelance-1099",
    title: "Math Tutoring & Freelance (1099)",
    subtitle: "Student earning direct self-employment income with no withholding",
    badge: "1099 / Gig Work",
    description: "Jordan tutored neighborhood middle schoolers and earned $1,400. Because clients paid directly, zero tax was withheld from his earnings.",
    answers: {
      taxYear: "2024",
      incomeTypes: ["freelance-gig"],
      documents: ["1099-nec"],
      dependentStatus: "yes",
      multipleIncome: "no",
      state: "TX",
      uncertainties: []
    },
    mockData: {
      w2s: [],
      selfEmploymentProfit: 1400.00,
    }
  },
  {
    id: "dual-income-student",
    title: "Dual Earner (Camp Counselor + Online Reselling)",
    subtitle: "Student with both a W-2 summer job and side-hustle sales",
    badge: "W-2 + 1099 Combo",
    description: "Alex worked as a city camp counselor in July and also earned money selling customized graphic stickers online.",
    answers: {
      taxYear: "2024",
      incomeTypes: ["w2-wages", "online-business"],
      documents: ["w2", "1099-k"],
      dependentStatus: "yes",
      multipleIncome: "yes",
      state: "NY",
      uncertainties: []
    },
    mockData: {
      w2s: [
        {
          employer: "Municipal Parks & Recreation",
          ein: "XX-XXX8812",
          box1Wages: 2800.00,
          box2FedWithheld: 140.00,
          box3SocSecWages: 2800.00,
          box4SocSecTax: 173.60,
          box5MedWages: 2800.00,
          box6MedTax: 40.60
        }
      ],
      selfEmploymentProfit: 850.00,
    }
  },
  {
    id: "first-timer-uncertain",
    title: "Uncertain First-Timer (No Documents Yet)",
    subtitle: "Student started their first part-time job in December",
    badge: "Exploring Tax Basics",
    description: "Taylor just started working at a cafe and doesn't know if they will receive a tax form or if they even need to file.",
    answers: {
      taxYear: "2024",
      incomeTypes: ["not-sure"],
      documents: ["no-docs-yet"],
      dependentStatus: "unsure",
      multipleIncome: "no",
      state: "FL",
      uncertainties: ["What forms to expect", "Whether parents file for me"]
    },
    mockData: {
      w2s: [],
      selfEmploymentProfit: 0,
    }
  }
];
