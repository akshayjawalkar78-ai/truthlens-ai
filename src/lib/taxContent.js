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
      answer: "Being claimed as a dependent does not by itself prevent you from filing your own federal return. If federal income tax was withheld and you want to claim a refund, you generally need to file a return. First confirm whether someone can claim you using the current IRS qualifying-child or qualifying-relative tests.",
      sourceTitle: "IRS Publication 501: Dependents",
      sourceUrl: "https://www.irs.gov/publications/p501",
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  if (cleanQuery.includes("refund") || cleanQuery.includes("money back")) {
    return {
      answer: "A federal refund generally means your payments and refundable credits were greater than your total tax for the year. Withholding is one kind of payment, but other income, taxes, and credits can affect the final result. Only a complete return can determine whether you are due a refund.",
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
      answer: "If your work is self-employment, net earnings of $400 or more generally trigger a federal filing requirement and self-employment tax. The standard rate is 15.3% for Social Security and Medicare, but special rules and exceptions can apply. A 1099 form is not required to report taxable income.",
      sourceTitle: "IRS Self-Employment Tax Guide",
      sourceUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
      confidenceLabel: "reviewed",
      mode: "offline"
    };
  }

  if (cleanQuery.includes("w2") || cleanQuery.includes("w-2") || cleanQuery.includes("box")) {
    return {
      answer: "Form W-2 reports wages and related tax information from an employer. Box 1 reports wages, tips, and other compensation; Box 2 reports federal income tax withheld; Box 4 reports Social Security tax withheld; and Box 6 reports Medicare tax withheld. Withholding is a prepayment, not a guaranteed refund.",
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
    answer: "Filing requirements depend on your income type, amount, age, dependent status, and tax year. If tax was withheld, filing may let you claim a refund; self-employment income can have separate filing rules. Use the IRS Interactive Tax Assistant or current IRS publications for your situation.",
    sourceTitle: "IRS Interactive Tax Assistant: Do I Need to File?",
    sourceUrl: "https://www.irs.gov/help/ita/do-i-need-to-file-a-tax-return",
    confidenceLabel: "reviewed",
    mode: "offline"
  };
}
