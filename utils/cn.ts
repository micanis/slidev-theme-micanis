import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Join class names and resolve Tailwind conflicts: the later class wins.
// cn('p-2 text-lg', cond && 'text-xl', 'p-4') -> 'text-xl p-4'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
