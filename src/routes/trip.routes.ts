import { Request, Response, Router } from "express";
import tripFactory from "../factories/trip.factory";
import {
  CreatingTripRequest,
  isCreatingTripRequest,
} from "../shared/types/dto/trip/CreatingTripRequest";

const tripRouter = Router();

tripRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    res.send(req.params.id);
  } catch (err) {
    res
      .status(400)
      .send(`Error parsing request params: ${err ?? "no error message"}`);
  }
});

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Créer un nouveau road-trip
 *     description: Retourne le nouveau road-trip créé
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatingTripRequest'
 *     responses:
 *       201:
 *         description: Road-trip créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripDto'
 *       400:
 *         description: Paramètres incorrects
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "Wrong parameters: Body needs to be a creating trip request"
 *       500:
 *         description: Erreur interne lors de la création du road-trip
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "Error creating trip: <l'erreur en question>"
 */
tripRouter.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).send("Miss paramters: Request must contain a body");
      return;
    }
    if (!isCreatingTripRequest(req.body)) {
      res
        .status(400)
        .send("Wrong parameters: Body needs to be a creating trip request");
      return;
    }
    const tripRequest: CreatingTripRequest = req.body;
    try {
      const newTrip = await tripFactory.create(tripRequest);
      res.status(201).send(newTrip.toDto());
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error creating trip: ${err}`);
    }
  } catch (err) {
    res
      .status(400)
      .send(`Error parsing request params: ${err ?? "no error message"}`);
  }
});

// tripRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const srcs = RoutingUtils.convertQueryParamToArray(req.query.srcs);
//     const langs = RoutingUtils.convertQueryParamToArray(req.query.langs);
//     const pageNumber = RoutingUtils.convertQueryParamToNumber(req.query.page);
//     const pageSize = RoutingUtils.convertQueryParamToNumber(req.query.limit);
//     const title = RoutingUtils.convertQueryParamToString(req.query.title);
//     const author = RoutingUtils.convertQueryParamToString(req.query.author);
//     if (srcs && !config.areValidSrcs(srcs)) {
//       res.status(400).send("srcs must be valid source names");
//       return;
//     }
//     try {
//       res.send(
//         await mangasController.getAll({
//           srcs: srcs as SourceName[],
//           pageNumber,
//           pageSize,
//           title,
//           author,
//           langs,
//         }),
//       );
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error);
//     }
//   } catch (error) {
//     res
//       .status(400)
//       .send(
//         "wrong paramters: request query could contains page, limit and srcs (SourceName[])",
//       );
//   }
// });

// mangasRouter.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const id = RoutingUtils.convertQueryParamToString(req.params.id);
//     if (!id) {
//       res.status(400).send("id must be a valid uuid");
//       return;
//     }
//     try {
//       const manga = await mangasController.get(id);
//       if (!manga) {
//         res.status(404).send("manga not found");
//         return;
//       }
//       res.send(manga);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error);
//     }
//   } catch (error) {
//     res.status(400).send("wrong paramters: request params must contains id");
//   }
// });

// mangasRouter.post("/", async (req: Request, res: Response) => {
//   if (!req.body || !req.body.manga) {
//     res
//       .status(400)
//       .send("miss paramters: request body must contains manga (Manga)");
//     return;
//   }
//   try {
//     const manga: Manga = req.body.manga;
//     if (!isManga(manga)) {
//       res.status(400).send("manga must be a Manga");
//       return;
//     }
//     try {
//       res.send(await mangasController.save(manga));
//     } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   } catch (err) {
//     console.error(err);
//     res
//       .status(400)
//       .send(
//         "wrong paramters: request body must contains chapter (ScrapedChapter)",
//       );
//   }
// });

export default tripRouter;
