export namespace StringUtils {
  /**
   * Add 0 on the left of a number
   *
   * Exemple: 2 -> 02
   * @param targetNb targeted number (as string or number)
   * @param maxLength max length of the wanted string
   * @returns number string of targeted length with 0 to the left
   */
  export function padStart(
    targetNb: number | string,
    maxLength: number,
  ): string {
    let toTheLeft = "";
    for (let i = 0; i < maxLength; i++) {
      toTheLeft += "0";
    }
    return (toTheLeft + targetNb).slice(-maxLength);
  }
}
