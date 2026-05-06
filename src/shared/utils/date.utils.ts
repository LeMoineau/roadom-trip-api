import { Season } from "../types/primitives/Date";
import { StringUtils } from "./string.utils";

export namespace DateUtils {
  /**
   * Get the season of a month (january => hiver)
   * @param month
   * @returns
   */
  export function monthToSeason(month: number): Season {
    if (month > 12 || month < 1) {
      throw new Error(
        `error getting season of month ${month} (must be between 1 and 12)`,
      );
    }
    if (month >= 1 && month <= 3) return "hiver";
    if (month >= 4 && month <= 6) return "printemps";
    if (month >= 7 && month <= 9) return "été";
    return "automne";
  }

  /**
   * Convert a date to a formatted date string.
   *
   * Exemple: "14:24 19/03/2026"
   * @param date targeted date
   * @returns formatted date string
   */
  export function toHHmmDDMMYY(date: Date): string {
    return `${StringUtils.padStart(date.getHours(), 2)}:${StringUtils.padStart(
      date.getMinutes(),
      2,
    )} ${StringUtils.padStart(date.getDate(), 2)}/${StringUtils.padStart(
      date.getMonth(),
      2,
    )}/${date.getFullYear()}`;
  }

  /**
   * Return the difference between two dates in minutes.
   * @param date1
   * @param date2
   * @returns
   */
  export function diffInMinute(date1: Date, date2: Date): number {
    return Math.round(((date1.getTime() - date2.getTime()) % 86400000) / 60000);
  }

  /**
   * Return the difference between two date in readable string.
   *
   * Exemple: 2h 12min, 34min..etc
   * @param minutes
   * @returns
   */
  export function diffHumanlyReadable(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}min`;
    } else {
      return `${remainingMinutes}min`;
    }
  }
}
