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
exports.AttractionChallenge = void 0;
const Challenge_model_1 = require("../primitives/Challenge.model");
//TODO: add default place
const DEFAULT_PLACE = {};
class AttractionChallenge extends Challenge_model_1.Challenge {
    constructor(_a) {
        var { attractions, rewardedHint } = _a, props = __rest(_a, ["attractions", "rewardedHint"]);
        super(props);
        this.attraction = this._generateAttraction(attractions);
        this.rewardedHint = rewardedHint;
    }
    /**
     * Recupere l'attraction la plus "interessante" parmi les resultat d'une requete nearbySearch de
     * Place API.
     *
     * Pour choisir l'attraction la plus interessante on suit les etapes :
     * - tri par notes
     * - si plusieurs vote max égaux, tri par nombre de notes
     * @param attractions NearbySearchResponse
     * @returns l'attraction la plus interessante
     */
    _generateAttraction(attractions) {
        if (attractions.results.length <= 0) {
            console.warn(`no attractions in nearby search response : ${JSON.stringify(attractions)}`);
            return DEFAULT_PLACE;
        }
        let bestRatingPlaces = [...attractions.results].sort((a, b) => {
            var _a, _b;
            if (!!!b.rating)
                return (_a = b.rating) !== null && _a !== void 0 ? _a : 0;
            if (!!!a.rating)
                return (_b = b.rating) !== null && _b !== void 0 ? _b : 0;
            return b.rating - a.rating;
        });
        const maxRating = bestRatingPlaces[0].rating;
        if (!!maxRating) {
            let mostVotedPlaces = [...bestRatingPlaces].sort((a, b) => {
                var _a, _b;
                if (!!!b.user_ratings_total)
                    return (_a = b.user_ratings_total) !== null && _a !== void 0 ? _a : 0;
                if (!!!a.user_ratings_total)
                    return (_b = b.user_ratings_total) !== null && _b !== void 0 ? _b : 0;
                return b.user_ratings_total - a.user_ratings_total;
            });
            return mostVotedPlaces[0];
        }
        return bestRatingPlaces[0];
    }
    toDto() {
        return Object.assign(Object.assign({}, super.toDto()), { type: "attraction-challenge", message: "Si tu atteins un lieux stylé précisé (parc d'attraction, lieu historique, etc…) sur le chemin, tu obtiendras un nouvel indice !", reward: this.rewardedHint, attraction: this.attraction, nbOfUses: 1, photos: "needed", minPhotos: 1 });
    }
}
exports.AttractionChallenge = AttractionChallenge;
