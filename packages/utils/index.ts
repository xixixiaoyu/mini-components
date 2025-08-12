/**
 * Checks if a value is a string.
 * @param value The value to check.
 * @returns `true` if the value is a string, `false` otherwise.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
