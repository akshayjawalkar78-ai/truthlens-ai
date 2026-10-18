import { GLOSSARY_TERMS } from "../data/glossary.js";
import { OFFICIAL_RESOURCES } from "../data/resources.js";

/**
 * Pure JavaScript Tax Content Retrieval & Fallback Engine
 * Serves verified educational explanations without requiring external network calls.
 */

export function queryTaxExplanation(query = "") {
  if (!query || typeof query !== "string") {
    return getGeneralFilingAdvice();
  }

  const cleanQuery = query.toLowerCase().trim();

  // 1. Specific teen FAQ topics
  if (cleanQuery.includes("dependent") || cleanQuery.includes("parent")) {
    return {
      answer: "Being claimed as a dependent on your parents' tax return DOES NOT stop you from filing your own return. If an employer took federal taxes out of your paychecks (Box 2 on your W-2), filing your own Form 1040 is the ONLY way to get that money back as a tax refund. You simply check the box on your return stating: 'Someone can claim you as a dependent.'",
      sourceTitle: "IRS Publication 501: Dependents",
      sourceUrl: "https://www.irs.gov/publications/p501",
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  if (cleanQuery.includes("refund") || cleanQuery.includes("money back")) {
    return {
      answer: "A tax refund is not free bonus money or lottery winnings. It is simply your own money being returned to you because your employer withheld more in estimated income taxes throughout the year than you actually owed. If you earned less than the single standard deduction, your federal income tax liability is usually $0, meaning 100% of the federal income tax withheld from your paychecks is refunded to you.",
      sourceTitle: "IRS Where's My Refund?",
      sourceUrl: "https://www.irs.gov/refunds",
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  // 2. Search glossary terms
  const matchedTerm = GLOSSARY_TERMS.find(t => 
    cleanQuery === t.term.toLowerCase() || 
    t.term.toLowerCase() === cleanQuery ||
    cleanQuery === t.id
  );

  if (matchedTerm) {
    return {
      answer: `${matchedTerm.term}: ${matchedTerm.definition} Why it matters: ${matchedTerm.whyItMatters} Example: ${matchedTerm.example}`,
      sourceTitle: matchedTerm.sourceTitle,
      sourceUrl: matchedTerm.sourceUrl,
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  if (cleanQuery.includes("1099") || cleanQuery.includes("gig") || cleanQuery.includes("tutor") || cleanQuery.includes("freelance")) {
    return {
      answer: "If you earned money doing independent work, tutoring, yard work, or selling online, you are considered self-employed by the IRS. If your net profit from self-employment was $400 or more in the calendar year, you are legally required to file a federal tax return and pay 15.3% Self-Employment Tax (which funds Social Security and Medicare), even if you are a minor or claimed as a dependent.",
      sourceTitle: "IRS Self-Employment Tax Guide",
      sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  if (cleanQuery.includes("w2") || cleanQuery.includes("w-2") || cleanQuery.includes("box")) {
    return {
      answer: "Form W-2 is the wage statement sent by employers by January 31. Box 1 shows your total taxable wages for the year, Box 2 shows the federal income tax withheld, Box 4 shows Social Security tax (6.2%), and Box 6 shows Medicare tax (1.45%). Box 2 is the most important box for teen filers: that is the money you are requesting back as a refund.",
      sourceTitle: "IRS About Form W-2",
      sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  return getGeneralFilingAdvice();
}

function getGeneralFilingAdvice() {
  return {
    answer: "FirstFile recommendation: Review your tax documents (such as your Form W-2 or 1099). If you worked a job and had federal income tax withheld, you should file your return through IRS Free File to claim your refund. If you earned $400+ from freelance or gig work, you will also need to report self-employment tax.",
    sourceTitle: "IRS Free File Portal",
    sourceUrl: "https://www.irs.gov/file-your-taxes-for-free",
    confidenceLabel: "reviewed",
    mode: "offline"
  };
}
