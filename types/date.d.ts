/**
 * Get date masked
 */
export declare const maskDate: (element: HTMLInputElement, pattern: string, locale?: string) => string;
/**
 * Get locale date pattern
 */
export declare const getDatePattern: (locale?: string) => string;
/**
 * Convert locale string to Date object
 */
export declare const toDate: (date: string, locale?: string) => Date;
