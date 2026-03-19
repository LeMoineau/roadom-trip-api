import { Challenge, ChallengeProps } from "../primitives/Challenge.model";
import { AttractionChallengeDto } from "../../shared/types/dto/challenges/AttractionChallenge.dto";
import { MediumHintDto } from "../../shared/types/dto/rewards/Reward";
import { GoogleMapsPlace } from "../../shared/types/google-maps/GoogleMapsPlace";
import { NearbySearchResponse } from "../../shared/types/google-maps/NearbySearchResponse";

//TODO: add default place
const DEFAULT_PLACE = {} as GoogleMapsPlace;

export class AttractionChallenge extends Challenge {
  attraction: GoogleMapsPlace;
  rewardedHint: MediumHintDto;

  constructor({
    attractions,
    rewardedHint,
    ...props
  }: {
    attractions: NearbySearchResponse;
    rewardedHint: MediumHintDto;
  } & ChallengeProps) {
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
  _generateAttraction(attractions: NearbySearchResponse): GoogleMapsPlace {
    if (attractions.results.length <= 0) {
      console.warn(
        `no attractions in nearby search response : ${JSON.stringify(attractions)}`,
      );
      return DEFAULT_PLACE;
    }
    let bestRatingPlaces = [...attractions.results].sort((a, b) => {
      if (!!!b.rating) return b.rating ?? 0;
      if (!!!a.rating) return b.rating ?? 0;
      return b.rating - a.rating;
    });
    const maxRating = bestRatingPlaces[0].rating;
    if (!!maxRating) {
      let mostVotedPlaces = [...bestRatingPlaces].sort((a, b) => {
        if (!!!b.user_ratings_total) return b.user_ratings_total ?? 0;
        if (!!!a.user_ratings_total) return b.user_ratings_total ?? 0;
        return b.user_ratings_total - a.user_ratings_total;
      });
      return mostVotedPlaces[0];
    }
    return bestRatingPlaces[0];
  }

  toDto(): AttractionChallengeDto {
    return {
      ...super.toDto(),
      type: "attraction-challenge",
      message:
        "Si tu atteins un lieux stylé précisé (parc d'attraction, lieu historique, etc…) sur le chemin, tu obtiendras un nouvel indice !",
      reward: this.rewardedHint,
      attraction: this.attraction,
      nbOfUses: 1,
      photos: "needed",
      minPhotos: 1,
    };
  }
}
