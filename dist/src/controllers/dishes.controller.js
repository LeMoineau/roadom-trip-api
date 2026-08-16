"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dishes_1 = require("../constants/dishes");
const array_utils_1 = require("../shared/utils/array.utils");
class DishesController {
    constructor() { }
    get({ state }) {
        var _a;
        const targetDishes = (_a = dishes_1.dishes.find((s) => s.state === state)) === null || _a === void 0 ? void 0 : _a.dishes;
        return targetDishes ? array_utils_1.ArrayUtils.getRandomItem(targetDishes) : undefined;
    }
}
exports.default = new DishesController();
