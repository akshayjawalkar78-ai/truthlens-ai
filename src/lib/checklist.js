/**
 * Pure JavaScript module to generate a personalized educational checklist
 * based on user questionnaire responses.
 */

export function generateChecklist(answers = {}) {
  const {
    taxYear = "2024",
    incomeTypes = [],
    documents = [],
    dependentStatus = "yes",
    multipleIncome = "no",
    state = "",
    uncertainties = []
  } = answers;

  const items = [];

  // 1. Core Document Gathering Item
  if (documents.includes("w2") || incomeTypes.includes("w2-wages")) {
    items.push({
      id: "gather-w2",
      title: "Collect Your Form W-2 from Each Employer",
      category: "Documents",
      description: "Employers are required to send your Form W-2 by January 31. Check your work email, online employee portal (like ADP, Gusto, or Paychex), or physical mailbox.",
      status: "action-required",
      whyItMatters: "Box 1 (total wages) and Box 2 (federal tax withheld) are the two primary numbers needed to file your Form 1040.",
      actionLink: "/practice?tab=w2-lab",
      actionText: "Practice Reading a Sample W-2"
    });
  }

  // 2. 1099 or Gig Work Items
  if (documents.includes("1099-nec") || documents.includes("1099-k") || incomeTypes.includes("freelance-gig") || incomeTypes.includes("online-business")) {
    items.push({
      id: "tally-1099-income",
      title: "Calculate Total Freelance or Gig Earnings",
      category: "Self-Employment",
      description: "If you made $400 or more in net self-employment earnings, you must file Schedule C and pay 15.3% Self-Employment Tax (Social Security & Medicare).",
      status: "action-required",
      whyItMatters: "No taxes were automatically withheld from your freelance paychecks. You may owe Self-Employment Tax even if you owe $0 in federal income tax.",
      actionLink: "/resources#irs-self-employment-tax",
      actionText: "View IRS Self-Employment Rules"
    });
  }

  // 3. Dependency Clarification
  if (dependentStatus === "yes" || dependentStatus === "unsure") {
    items.push({
      id: "check-dependent-box",
      title: "Confirm Your Dependent Status on Form 1040",
      category: "Filing Basics",
      description: "If your parents or guardians provide more than half your financial support, check the box: 'Someone can claim you as a dependent' on your return.",
      status: "guidance",
      whyItMatters: "Being claimed as a dependent does NOT prevent you from filing your own return to claim your refund, but you cannot claim the full adult standard deduction.",
      actionLink: "/resources#irs-dependents-pub501",
      actionText: "Read IRS Publication 501"
    });
  }

  // 4. Multiple W-2 Aggregation
  if (multipleIncome === "yes" || incomeTypes.length > 1) {
    items.push({
      id: "aggregate-incomes",
      title: "Do Not File Until You Have ALL Documents",
      category: "Filing Strategy",
      description: "You file only ONE federal tax return per calendar year. If you file before receiving all W-2s or 1099s, you will have to file an amended return (Form 1040-X).",
      status: "guidance",
      whyItMatters: "Filing an amended return can delay your refund by several months.",
      actionLink: "/practice?tab=mock-return",
      actionText: "Try Multi-Income Mock Return"
    });
  }

  // 5. Free File Tool Selection
  items.push({
    id: "use-irs-free-file",
    title: "Use IRS Free File (Never Pay to File)",
    category: "Software Tools",
    description: "Since student and teen earners almost always make under $79,000, you are entitled to 100% free federal and state preparation through IRS Free File.",
    status: "recommendation",
    whyItMatters: "Commercial websites often attempt to charge teens $40-$80 for simple returns. IRS Free File ensures zero out-of-pocket fees.",
    actionLink: "https://www.irs.gov/file-your-taxes-for-free",
    actionText: "Visit IRS Free File Portal",
    isExternal: true
  });

  // 6. Direct Deposit Setup
  items.push({
    id: "direct-deposit",
    title: "Gather Routing & Account Numbers for Direct Deposit",
    category: "Refund Delivery",
    description: "Electronic direct deposit into a checking or savings account delivers your tax refund in approximately 21 days, compared to 6-8 weeks for paper checks.",
    status: "tip",
    whyItMatters: "Fastest and safest refund method. If you don't have a bank account, some Free File partners offer prepaid cards or savings bonds.",
    actionLink: "/resources",
    actionText: "Learn About Refunds"
  });

  return {
    taxYear,
    items,
    summary: {
      totalItems: items.length,
      estimatedFilingNeed: documents.includes("w2") || incomeTypes.includes("w2-wages")
        ? "Likely eligible for a refund of withheld taxes!"
        : "Review filing requirements to confirm if an official return is needed."
    }
  };
}
