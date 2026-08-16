"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const crypto_1 = require("crypto");
class Step {
    constructor({ id = (0, crypto_1.randomUUID)(), availableAt, reach }) {
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
