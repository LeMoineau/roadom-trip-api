import { MathUtils } from "./math.utils";

export namespace ArrayUtils {
  export function getRandomItem<T>(arr: T[]): T {
    if (arr.length <= 0) {
      throw new Error("cannot get random item in empty array");
    }
    const index = MathUtils.getRandomInt(arr.length);
    return arr[index];
  }

  /**
   * Return an empty array if item not defined, else array containing only the targeted item
   *
   * Usefull mostly in react array components
   * @param item targeted item
   * @returns empty array if item not define, else [item]
   */
  export function itemOrVoid<T>(item?: T | false): T[] {
    if (!!!item) return [];
    return [item];
  }
}
