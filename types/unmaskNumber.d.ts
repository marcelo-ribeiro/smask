/**
 * Remove non-numeric characters from a string
 * and if pattern equals currency, divide by 100
 */
export declare const unmaskNumber: (value: string) => number;
/**
 * Reverse Number Format
 */
export declare const numberUnformat: (value: string, locale?: string) => number;
/**
 * Reverse Currency Format
 */
export declare const currencyUnformat: (value: string, locale?: string, currency?: Intl.NumberFormatOptions["currency"]) => number;
