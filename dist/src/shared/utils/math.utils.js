"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
var MathUtils;
(function (MathUtils) {
    function getRandomFloat(max, min = 0) {
        return Math.random() * (max - min) + min;
    }
    MathUtils.getRandomFloat = getRandomFloat;
    function getRandomInt(max, min = 0) {
        return Math.floor(getRandomFloat(max, min));
    }
    MathUtils.getRandomInt = getRandomInt;
})(MathUtils || (exports.MathUtils = MathUtils = {}));
