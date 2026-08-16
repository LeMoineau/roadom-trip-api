"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtils = void 0;
const math_utils_1 = require("./math.utils");
var ArrayUtils;
(function (ArrayUtils) {
    function getRandomItem(arr) {
        if (arr.length <= 0) {
            throw new Error("cannot get random item in empty array");
        }
        const index = math_utils_1.MathUtils.getRandomInt(arr.length);
        return arr[index];
    }
    ArrayUtils.getRandomItem = getRandomItem;
    /**
     * Return an empty array if item not defined, else array containing only the targeted item
     *
     * Usefull mostly in react array components
     * @param item targeted item
     * @returns empty array if item not define, else [item]
     */
    function itemOrVoid(item) {
        if (!!!item)
            return [];
        if (Array.isArray(item))
            return item;
        return [item];
    }
    ArrayUtils.itemOrVoid = itemOrVoid;
})(ArrayUtils || (exports.ArrayUtils = ArrayUtils = {}));
