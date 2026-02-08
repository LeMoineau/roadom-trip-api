import { departements } from "../constants/departements";
import { departementsTourism } from "../constants/tourism";
import { DepartementCode } from "../shared/types/geo/Departement";
import { Season } from "../shared/types/primitives/Date";
import { DateUtils } from "../shared/utils/date.utils";

class TourismService {
  _leaderboardByNuitees: {
    departementCode: DepartementCode;
    nbNuitees: number;
  }[] = [];

  constructor() {
    this._init();
  }

  _init() {
    const leaderboard = departements.map((d) => ({
      departementCode: d.code,
      nbNuitees: 0,
    }));
    departementsTourism.forEach((d) => {
      const row = leaderboard.find(
        (l) => l.departementCode === d.departementCode,
      );
      if (!row) return;
      row.nbNuitees += d.nbNuitees;
    });
    this._leaderboardByNuitees = leaderboard.sort(
      (a, b) => b.nbNuitees - a.nbNuitees,
    );
  }

  /**
   * Return the popularity rank of a departement by year (calculate on year 2024)
   * @param departementCode code of the targeted departement
   * @returns rank number of the targeted departement
   */
  getPopularityRankByYearOf(departementCode: DepartementCode): number {
    const rank = this._leaderboardByNuitees.findIndex(
      (l) => l.departementCode === departementCode,
    );
    if (rank === -1) return this._leaderboardByNuitees.length + 1;
    return rank + 1;
  }

  /**
   * Return the
   * @param departementCode
   * @returns
   */
  getMostAttractiveSeasonOf(departementCode: DepartementCode): Season {
    const sortedMonths = departementsTourism
      .filter((d) => d.departementCode === departementCode)
      .sort((a, b) => b.placeOccupancyRate - a.placeOccupancyRate);
    console.log(sortedMonths);
    try {
      const mostAttractiveMonths = parseInt(
        sortedMonths[0].timePeriod.split("-")[1],
      );
      return DateUtils.monthToSeason(mostAttractiveMonths);
    } catch (err) {
      console.log(`error parsing months of ${sortedMonths[0]}`, err);
      return "été";
    }
  }
}

export default new TourismService();
