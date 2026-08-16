"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const uuid_1 = require("uuid");
class Step {
    constructor({ id = (0, uuid_1.v4)(), availableAt, reach }) {
        this.id = id;
        this.availableAt = availableAt;
        this.reach = !!reach;
    }
    /**
     * Convert the model into dto for transfer between services
     * @returns corresponding hint dto
     */
    toDto() {
        return {
            id: this.id,
            type: "unknown",
            availableAt: this.availableAt,
            reach: this.reach,
        };
    }
}
exports.Step = Step;
