export function isOfType<T>(obj: any): obj is T {
  const keys = Object.keys(obj) as (keyof T)[];
  return keys.every(key => typeof obj[key] !== 'undefined');
}
