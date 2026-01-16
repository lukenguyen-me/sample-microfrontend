/**
 * Formats a number as currency with thousand separators
 * @param amount - The numeric amount to format
 * @returns Formatted string with thousand separators and 2 decimal places (e.g., "1,720.00")
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
