import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const encryptKey = (passkey) => {
  return btoa(passkey);
};

export const decryptKey = (passkey) => {
  return atob(passkey);
};
