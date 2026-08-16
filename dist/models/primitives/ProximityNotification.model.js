"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProximityNotification = void 0;
const Step_model_1 = require("./Step.model");
class ProximityNotification extends Step_model_1.Step {
    /**
     * From this step, user will recieve a notification if he enter in range of {range}km around the
     * destination point
     * @param range detection range (in km)
     */
    constructor(_a) {
        var { range } = _a, props = __rest(_a, ["range"]);
        super(props);
        this.range = range;
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "proximity-notification", range: this.range });
    }
}
exports.ProximityNotification = ProximityNotification;
