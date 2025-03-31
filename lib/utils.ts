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

export const validate_units = (str: string): boolean => {
	if(str === "kg")
		return true;
	if(str === "lbs")
		return true;
	return true; //default value
};

export const validate_frequency = (str: string[]): number => {
	const M = 0b0000001;
	const T = 0b0000010;
	const W = 0b0000100;
	const R = 0b0001000;
	const F = 0b0010000;
	const S = 0b0100000;
	const U = 0b1000000;
	let frequency = 0b0000000;
	str.forEach(s => {
		if(s === "M")
			frequency |= M;
		if(s === "T")
			frequency |= T;
		if(s === "W")
			frequency |= W;
		if(s === "R")
			frequency |= R;
		if(s === "F")
			frequency |= F;
		if(s === "S")
			frequency |= S;
		if(s === "U")
			frequency |= U;
	});
	return frequency;
}
