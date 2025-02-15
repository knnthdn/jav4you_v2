import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hours, minutes, secs]
    .map((val) => String(val).padStart(2, "0"))
    .join(":");
}

export function cleanQueryString(queryString: string) {
  const params = new URLSearchParams(queryString);
  const keysToDelete: string[] = [];

  // Step 1: Collect keys with "undefined" values
  params.forEach((value, key) => {
    if (value === "undefined") {
      keysToDelete.push(key);
    }
  });

  // Step 2: Delete the collected keys
  keysToDelete.forEach((key) => {
    params.delete(key);
  });

  // Step 3: Return the cleaned query string
  return params.toString() || queryString ? `?${params.toString()}` : "";
}
