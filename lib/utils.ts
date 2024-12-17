import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSearchParam(url: string, param: string) {
  const include = url.includes(param);

  if (!include) return null;

  const params = url.split(/([&,?,=])/);
  const index = params.indexOf(param);
  const value = params[index + 2];
  return value;
}
