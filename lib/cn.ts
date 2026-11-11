import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** clsx + tailwind-merge: later utility classes reliably win over earlier ones. */
export const cn = (...v: ClassValue[]) => twMerge(clsx(v));
