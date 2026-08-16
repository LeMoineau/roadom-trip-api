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
exports.RebusHint = void 0;
const Hint_model_1 = require("../primitives/Hint.model");
const rebus_fr_1 = require("rebus-fr");
const DEFAULT_MESSAGE = "déso pas d'information a faire croquer";
class RebusHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { wikipediaPage } = _a, props = __rest(_a, ["wikipediaPage"]);
        super(props);
        this.message = this._generateMessage(wikipediaPage);
    }
    _generateMessage(wikipediaPage) {
        if (wikipediaPage.length <= 0) {
            console.warn(`wikipedia page ${JSON.stringify(wikipediaPage)} without sections so no rebus message`);
            return (0, rebus_fr_1.toRebus)(DEFAULT_MESSAGE);
        }
        for (let section of wikipediaPage) {
            if (section.title !== "Introduction" && section.paragraphes.length > 0) {
                return (0, rebus_fr_1.toRebus)(section.paragraphes[0]);
            }
        }
        return (0, rebus_fr_1.toRebus)(wikipediaPage[0].paragraphes[0]);
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "rebus-hint", message: this.message });
    }
}
exports.RebusHint = RebusHint;
