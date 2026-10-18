/**
 * Pure JavaScript module for deterministic paycheck calculations
 * Explains why Gross Pay differs from Take-Home Pay.
 */

export function calculatePaycheck({
  grossPay = 0,
  payFrequency = "biweekly",
  hoursWorked = 0,
  hourlyRate = 0,
  customFederalWithheld = null,
  customStateWithheld = null,
  isCalculatedFromHours = false
}) {
  let effectiveGross = Number(grossPay);

  if (isCalculatedFromHours && Number(hoursWorked) > 0 && Number(hourlyRate) > 0) {
    effectiveGross = Number(hoursWorked) * Number(hourlyRate);
  }

  if (isNaN(effectiveGross) || effectiveGross < 0) {
    effectiveGross = 0;
  }

  // Mandatory FICA payroll taxes (Social Security 6.2% + Medicare 1.45% = 7.65%)
  const socialSecurityTax = Math.round(effectiveGross * 0.062 * 100) / 100;
  const medicareTax = Math.round(effectiveGross * 0.0145 * 100) / 100;
  const totalFica = Math.round((socialSecurityTax + medicareTax) * 100) / 100;

  // Estimated Federal Income Tax Withholding for part-time/teen worker
  // Default estimate is approximately 5% for student wage brackets if no custom override
  let federalWithholding = 0;
  let isWithholdingEstimated = true;

  if (customFederalWithheld !== null && !isNaN(Number(customFederalWithheld)) && Number(customFederalWithheld) >= 0) {
    federalWithholding = Number(customFederalWithheld);
    isWithholdingEstimated = false;
  } else {
    // Modeled progressive estimate: if annual equivalent exceeds single standard deduction (~$14,600)
    const annualMultiplier = payFrequency === "weekly" ? 52 : payFrequency === "biweekly" ? 26 : 12;
    const estimatedAnnual = effectiveGross * annualMultiplier;
    
    if (estimatedAnnual > 14600) {
      federalWithholding = Math.round((effectiveGross * 0.07) * 100) / 100;
    } else if (effectiveGross > 150) {
      federalWithholding = Math.round((effectiveGross * 0.04) * 100) / 100;
    } else {
      federalWithholding = 0;
    }
  }

  // Estimated State Income Tax Withholding
  let stateWithholding = 0;
  if (customStateWithheld !== null && !isNaN(Number(customStateWithheld)) && Number(customStateWithheld) >= 0) {
    stateWithholding = Number(customStateWithheld);
  } else {
    stateWithholding = effectiveGross > 200 ? Math.round((effectiveGross * 0.02) * 100) / 100 : 0;
  }

  const totalDeductions = Math.round((totalFica + federalWithholding + stateWithholding) * 100) / 100;
  const takeHomePay = Math.max(0, Math.round((effectiveGross - totalDeductions) * 100) / 100);

  return {
    grossPay: effectiveGross,
    takeHomePay,
    totalDeductions,
    breakdown: {
      socialSecurity: socialSecurityTax,
      medicare: medicareTax,
      totalFica,
      federalWithholding,
      stateWithholding,
      isWithholdingEstimated
    },
    educationalNotes: [
      `FICA payroll taxes (Social Security ${socialSecurityTax.toFixed(2)} and Medicare ${medicareTax.toFixed(2)}) are mandatory deductions required by federal law for nearly all W-2 employees regardless of age or student status.`,
      isWithholdingEstimated 
        ? `Federal income tax withholding of $${federalWithholding.toFixed(2)} is an educational estimate. Your actual employer withholding is determined by the Form W-4 you filled out when hired.`
        : `Using your custom entered withholding amount of $${federalWithholding.toFixed(2)}.`,
      `If your annual earnings are below the standard deduction, the federal income tax withheld ($${federalWithholding.toFixed(2)}) can typically be refunded back to you when you file your annual tax return.`
    ]
  };
}
