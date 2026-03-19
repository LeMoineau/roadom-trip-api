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
}
