"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const departements_1 = require("../constants/departements");
const tourism_1 = require("../constants/tourism");
const date_utils_1 = require("../shared/utils/date.utils");
class TourismController {
    constructor() {
        this._leaderboardByNuitees = [];
        this._init();
    }
    _init() {
        const leaderboard = departements_1.departements.map((d) => ({
            departementCode: d.code,
            nbNuitees: 0,
        }));
        tourism_1.departementsTourism.forEach((d) => {
            const row = leaderboard.find((l) => l.departementCode === d.departementCode);
            if (!row)
                return;
            row.nbNuitees += d.nbNuitees;
        });
        this._leaderboardByNuitees = leaderboard.sort((a, b) => b.nbNuitees - a.nbNuitees);
    }
    /**
     * Return the popularity rank of a departement by year (calculate on year 2024)
     * @param departementCode code of the targeted departement
     * @returns rank number of the targeted departement
     */
    getPopularityRankByYearOf(departementCode) {
        const rank = this._leaderboardByNuitees.findIndex((l) => l.departementCode === departementCode);
        if (rank === -1)
            return this._leaderboardByNuitees.length + 1;
        return rank + 1;
    }
    /**
     * Return the
     * @param departementCode
     * @returns
     */
    getMostAttractiveSeasonOf(departementCode) {
        const sortedMonths = tourism_1.departementsTourism
            .filter((d) => d.departementCode === departementCode)
            .sort((a, b) => b.placeOccupancyRate - a.placeOccupancyRate);
        try {
            const mostAttractiveMonths = parseInt(sortedMonths[0].timePeriod.split("-")[1]);
            return date_utils_1.DateUtils.monthToSeason(mostAttractiveMonths);
        }
        catch (err) {
            console.log(`error parsing months of ${sortedMonths[0]}`, err);
            return "été";
        }
    }
}
exports.default = new TourismController();
