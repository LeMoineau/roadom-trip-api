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

  /**
   * Put first letter of a string to uppercase
   *
   * Exemple: test -> Test
   * @param str targeted string
   * @return well formatted string
   */
  export function wellFormatted(str: string): string {
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
  }
}
