export namespace MathUtils {
  export function getRandomFloat(max: number, min: number = 0): number {
    return Math.random() * (max - min) + min;
  }

  export function getRandomInt(max: number, min: number = 0): number {
    return Math.floor(getRandomFloat(max, min));
  }
}
