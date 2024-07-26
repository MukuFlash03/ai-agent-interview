import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isPublicKeyMissingError = ({ vapiError }: { vapiError: { error: { statusCode: number; error: string } } }) => {
  return !!vapiError && vapiError.error.statusCode === 403 && vapiError.error.error === "Forbidden";
};
