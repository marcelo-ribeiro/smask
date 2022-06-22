export const unmask = (value: string, pattern?: string): string => {
  if (!value) return value;
  value = value.replace(/\W/gi, "");
  return !!pattern ? value.slice(0, pattern.replace(/\W/gi, "").length) : value;
};
