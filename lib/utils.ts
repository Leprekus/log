import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validate_number = (str: string): number => {
	if(Number.isNaN(Number(str)))
		return 0;
	if(Number(str) < 0)
		return 0;
	return Number(str);
};
