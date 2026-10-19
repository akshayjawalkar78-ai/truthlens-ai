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
  const stateNames = {
    CA: "California",
    TX: "Texas",
    NY: "New York",
    FL: "Florida",
    IL: "Illinois",
    OH: "Ohio",
    PA: "Pennsylvania",
    OTHER: "your state",
  };

  // 1. Core Document Gathering Item
  if (documents.includes("w2") || incomeTypes.includes("w2-wages")) {
    items.push({
      id: "gather-w2",
      title: "Collect Your Form W-2 from Each Employer",
      category: "Documents",
      description: "Employers generally furnish Form W-2 by January 31 of the following year. Check your work email, employee portal, or mailbox; timing can vary in some circumstances.",
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
      description: "Net earnings of $400 or more from self-employment generally trigger a federal filing requirement and self-employment tax. Schedule C is commonly used to report business profit; exceptions and other rules apply.",
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
      description: "Whether someone can claim you depends on IRS qualifying-child or qualifying-relative tests. Review the rules and confirm details with the person who may claim you.",
      status: "guidance",
      whyItMatters: "Dependent status does not automatically prevent you from filing your own return, but it affects filing rules and some tax benefits.",
      actionLink: "/resources#irs-dependents-pub501",
      actionText: "Read IRS Publication 501"
    });
  }

  if (state) {
    const stateName = stateNames[state] || state;
    items.push({
      id: "check-state-rules",
      title: `Explore state tax rules for ${stateName}`,
      category: "State Taxes",
      description: "State income-tax rules, deadlines, and filing requirements differ. Check current information from your state's official tax agency, especially if you lived or worked in more than one state.",
      status: "guidance",
      whyItMatters: "This educational checklist does not determine whether you need to file a state return.",
    });
  }

  const openQuestions = [...uncertainties];
  if (incomeTypes.includes("not-sure")) openQuestions.push("Which income types apply");
  if (documents.includes("unsure-docs") || documents.includes("no-docs-yet")) openQuestions.push("Which documents to expect");
  if (dependentStatus === "unsure") openQuestions.push("Whether someone can claim you as a dependent");

  if (openQuestions.length > 0) {
    items.push({
      id: "resolve-open-questions",
      title: "Write down questions to check",
      category: "Next Steps",
      description: [...new Set(openQuestions)].join("; "),
      status: "guidance",
      whyItMatters: "You can review these topics with a trusted adult or check current official guidance before making a filing decision.",
    });
  }

  // 4. Multiple W-2 Aggregation
  if (multipleIncome === "yes" || incomeTypes.length > 1) {
    items.push({
      id: "aggregate-incomes",
      title: "Do Not File Until You Have ALL Documents",
      category: "Filing Strategy",
      description: "Most individuals file one federal income tax return for a tax year. Gather all income documents before filing; missing information may require a correction or amended return.",
      status: "guidance",
      whyItMatters: "Filing an amended return can delay your refund by several months.",
      actionLink: "/practice?tab=mock-return",
      actionText: "Try Multi-Income Mock Return"
    });
  }

  // 5. Free File Tool Selection
  items.push({
    id: "use-irs-free-file",
    title: "Check IRS Free File Eligibility",
    category: "Software Tools",
    description: "The current IRS Free File page lists an AGI limit of $89,000 or below for Guided Tax. Partner eligibility rules vary, and free state-return availability depends on the partner and state.",
    status: "recommendation",
    whyItMatters: "Use the IRS partner-selection tool and read the selected offer's eligibility and fees before starting. IRS Free File is separate from commercial products outside the program.",
    actionLink: "https://www.irs.gov/file-your-taxes-for-free",
    actionText: "Visit IRS Free File Portal",
    isExternal: true
  });

  // 6. Direct Deposit Setup
  items.push({
    id: "direct-deposit",
    title: "Explore Refund Delivery Options",
    category: "Refund Delivery",
    description: "If a return shows a refund, review the IRS options for receiving it. Processing times vary; no delivery date is guaranteed.",
    status: "tip",
    whyItMatters: "Learn about available delivery methods from the IRS. FirstFile never asks for bank or routing numbers.",
    actionLink: "/resources",
    actionText: "Learn About Refunds"
  });

  return {
    taxYear,
    items,
    summary: {
      totalItems: items.length,
      estimatedFilingNeed: documents.includes("w2") || incomeTypes.includes("w2-wages")
        ? "A W-2 reports wages and withholding. Whether you must file or may receive a refund depends on your complete income, credits, and tax-year rules."
        : "These answers are learning prompts, not a filing determination. Use current IRS guidance to check whether a return is required."
    }
  };
}
