import { Request, Response, Router } from "express";
import tripRouter from "./trip.routes";
import osmService from "../services/osm.service";
import { GeoPoint } from "../shared/models/GeoPoint.model";
import { HGBDHint } from "../models/hints/HGBDHint.model";
import { ShoesHint } from "../models/hints/ShoesHint.model";
import { TourismHint } from "../models/hints/TourismHint.model";
import { FlagHint } from "../models/hints/FlagHint.model";
import { BlasonHint } from "../models/hints/BlasonHint.model";
import { departements } from "../constants/departements";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("roadom-trip-api ready!");
});

router.use("/trips", tripRouter);

router.get("/test", async (_: Request, res: Response) => {
  // OSM Service
  // res.send(await osmService.search({ q: "13 Impasse andromaque" }));
  // res.send(await osmService.reverse({ lat: 48, lon: -1 }));

  // Hints
  // res.send(
  //   new HGBDHint({
  //     startingPos: new GeoPoint({ lat: 48.101288, lon: -1.844129 }),
  //     endingPos: new GeoPoint({ lat: 48.361407, lon: -3.644805 }),
  //     methodGenerationDirection: "from-starting-pos",
  //   }).toDto(),
  // );
  // res.send(
  //   new HGBDHint({
  //     startingPos: new GeoPoint({ lat: 48.101288, lon: -1.844129 }),
  //     endingPos: new GeoPoint({ lat: 44.361407, lon: 0.644805 }),
  //     methodGenerationDirection: "from-ending-pos",
  //   }).toDto(),
  // );
  // res.send(
  //   new HGBDHint({
  //     startingPos: new GeoPoint({ lat: 48.101288, lon: -1.844129 }),
  //     endingPos: new GeoPoint({ lat: 44.361407, lon: 0.644805 }),
  //   }).toDto(),
  // );
  // const hint = new ShoesHint({
  //   endingPos: new GeoPoint({ lat: 45.101288, lon: 5.844129 }),
  // });

  // await hint.init();

  // const hint = new TourismHint({
  //   endingDepartementCode: "69D",
  //   methodGenerationMessage: "most-popular-season",
  // });

  // const hint = new FlagHint({ departementCode: "69D" });

  const hint = new BlasonHint({ departementCode: "35" });

  res.send(hint.toDto());
});

export default router;
