"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const string_utils_1 = require("./string.utils");
var DateUtils;
(function (DateUtils) {
    /**
     * Get the season of a month (january => hiver)
     * @param month
     * @returns
     */
    function monthToSeason(month) {
        if (month > 12 || month < 1) {
            throw new Error(`error getting season of month ${month} (must be between 1 and 12)`);
        }
        if (month >= 1 && month <= 3)
            return "hiver";
        if (month >= 4 && month <= 6)
            return "printemps";
        if (month >= 7 && month <= 9)
            return "été";
        return "automne";
    }
    DateUtils.monthToSeason = monthToSeason;
    /**
     * Convert a date to a formatted date string.
     *
     * Exemple: "14:24 19/03/2026"
     * @param date targeted date
     * @returns formatted date string
     */
    function toHHmmDDMMYY(date) {
        return `${string_utils_1.StringUtils.padStart(date.getHours(), 2)}:${string_utils_1.StringUtils.padStart(date.getMinutes(), 2)} ${string_utils_1.StringUtils.padStart(date.getDate(), 2)}/${string_utils_1.StringUtils.padStart(date.getMonth(), 2)}/${date.getFullYear()}`;
    }
    DateUtils.toHHmmDDMMYY = toHHmmDDMMYY;
    /**
     * Return the difference between two dates in minutes.
     * @param date1
     * @param date2
     * @returns
     */
    function diffInMinute(date1, date2) {
        return Math.round(((date1.getTime() - date2.getTime()) % 86400000) / 60000);
    }
    DateUtils.diffInMinute = diffInMinute;
    /**
     * Return the difference between two date in readable string.
     *
     * Exemple: 2h 12min, 34min..etc
     * @param minutes
     * @returns
     */
    function diffHumanlyReadable(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${remainingMinutes}min`;
        }
        else {
            return `${remainingMinutes}min`;
        }
    }
    DateUtils.diffHumanlyReadable = diffHumanlyReadable;
})(DateUtils || (exports.DateUtils = DateUtils = {}));
