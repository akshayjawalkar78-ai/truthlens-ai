/**
 * Educational paycheck model using simplified FICA rates and entered withholding.
 */

export function calculatePaycheck({
  grossPay = 0,
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

  // Simplified employee FICA rates; wage-base limits and special cases are not modeled.
  const socialSecurityTax = Math.round(effectiveGross * 0.062 * 100) / 100;
  const medicareTax = Math.round(effectiveGross * 0.0145 * 100) / 100;
  const totalFica = Math.round((socialSecurityTax + medicareTax) * 100) / 100;

  const hasFederalWithholding = customFederalWithheld !== null
    && customFederalWithheld !== ""
    && Number.isFinite(Number(customFederalWithheld))
    && Number(customFederalWithheld) >= 0;
  const hasStateWithholding = customStateWithheld !== null
    && customStateWithheld !== ""
    && Number.isFinite(Number(customStateWithheld))
    && Number(customStateWithheld) >= 0;
  const federalWithholding = hasFederalWithholding ? Number(customFederalWithheld) : null;
  const stateWithholding = hasStateWithholding ? Number(customStateWithheld) : null;
  const enteredWithholding = (federalWithholding ?? 0) + (stateWithholding ?? 0);
  const totalDeductions = Math.round((totalFica + enteredWithholding) * 100) / 100;
  const remainingAfterEnteredDeductions = Math.max(0, Math.round((effectiveGross - totalDeductions) * 100) / 100);
  const takeHomePay = hasFederalWithholding && hasStateWithholding ? remainingAfterEnteredDeductions : null;

  return {
    grossPay: effectiveGross,
    takeHomePay,
    remainingAfterEnteredDeductions,
    totalDeductions,
    breakdown: {
      socialSecurity: socialSecurityTax,
      medicare: medicareTax,
      totalFica,
      federalWithholding,
      stateWithholding,
      hasFederalWithholding,
      hasStateWithholding,
    },
    educationalNotes: [
      "This simplified model applies 6.2% Social Security and 1.45% Medicare to the pay entered. It does not model annual wage limits, Additional Medicare Tax, exemptions, or every payroll rule.",
      hasFederalWithholding
        ? `Federal withholding uses the $${federalWithholding.toFixed(2)} amount you entered; withholding is a prepayment, not your final annual tax liability.`
        : "Federal withholding is not included. Enter the amount shown on a paycheck to include it; this tool does not estimate withholding from wages alone.",
      hasStateWithholding
        ? `State withholding uses the $${stateWithholding.toFixed(2)} amount you entered; state rules and amounts vary.`
        : "State withholding is not included. Enter the amount shown on a paycheck; this tool does not guess state tax rates.",
      "Other deductions such as benefits or retirement contributions are not modeled. A refund or balance due is determined from a complete annual return, not this paycheck estimate."
    ]
  };
}
