import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type ClassValues<T extends string> = Partial<{
    [K in T]: string | boolean | undefined | null | 0;
}>;
