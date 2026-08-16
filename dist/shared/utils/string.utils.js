"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var StringUtils;
(function (StringUtils) {
    /**
     * Add 0 on the left of a number
     *
     * Exemple: 2 -> 02
     * @param targetNb targeted number (as string or number)
     * @param maxLength max length of the wanted string
     * @returns number string of targeted length with 0 to the left
     */
    function padStart(targetNb, maxLength) {
        let toTheLeft = "";
        for (let i = 0; i < maxLength; i++) {
            toTheLeft += "0";
        }
        return (toTheLeft + targetNb).slice(-maxLength);
    }
    StringUtils.padStart = padStart;
    /**
     * Put first letter of a string to uppercase
     *
     * Exemple: test -> Test
     * @param str targeted string
     * @return well formatted string
     */
    function wellFormatted(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
    }
    StringUtils.wellFormatted = wellFormatted;
})(StringUtils || (exports.StringUtils = StringUtils = {}));
