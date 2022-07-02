declare const _default: {
    mask: (value: string, patterns: string[]) => string;
    input: (element: HTMLInputElement, patterns: string[]) => () => void;
    number: (value: number, locale?: string, style?: string, options?: Intl.NumberFormatOptions | undefined) => string;
    currency: (value: number, locale?: string, currency?: string | undefined) => string;
    getDatePattern: (locale?: string | undefined) => string;
    maskDate: (element: HTMLInputElement, pattern: string, locale?: string) => string;
    toDate: (date: string, locale?: string | undefined) => Date;
    prepareMaskInputs: () => void;
    unmask: (value: string, pattern?: string | undefined) => string;
    currencyUnformat: (value: string, locale?: string, currency?: string | undefined) => number;
    numberUnformat: (value: string, locale?: string | undefined) => number;
    unmaskNumber: (value: string) => number;
};
export default _default;
