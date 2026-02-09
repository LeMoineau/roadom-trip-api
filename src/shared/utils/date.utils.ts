import { Season } from "../types/primitives/Date";

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
}
