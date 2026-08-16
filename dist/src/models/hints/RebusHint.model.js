"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const DEFAULT_MESSAGE = "déso pas d'information a faire croquer";
class RebusHint extends Hint_model_1.Hint {
    constructor(_a) {
        var { wikipediaPage } = _a, props = __rest(_a, ["wikipediaPage"]);
        super(props);
        this.message = DEFAULT_MESSAGE;
        this.wikipediaPage = wikipediaPage;
    }
    generateRebus() {
        return __awaiter(this, void 0, void 0, function* () {
            this.message = yield this._generateMessage(this.wikipediaPage);
        });
    }
    _generateMessage(wikipediaPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const { toRebus } = yield Promise.resolve().then(() => __importStar(require("rebus-fr")));
            if (wikipediaPage.length <= 0) {
                console.warn(`wikipedia page ${JSON.stringify(wikipediaPage)} without sections so no rebus message`);
                return toRebus(DEFAULT_MESSAGE);
            }
            for (let section of wikipediaPage) {
                if (section.title !== "Introduction" && section.paragraphes.length > 0) {
                    return toRebus(section.paragraphes[0]);
                }
            }
            return toRebus(wikipediaPage[0].paragraphes[0]);
        });
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "rebus-hint", message: this.message });
    }
}
exports.RebusHint = RebusHint;
