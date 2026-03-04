import { MathUtils } from "./math.utils";

export namespace ArrayUtils {
  export function getRandomItem<T>(arr: T[]): T {
    if (arr.length <= 0) {
      throw new Error("cannot get random item in empty array");
    }
    const index = MathUtils.getRandomInt(arr.length);
    return arr[index];
  }
}
