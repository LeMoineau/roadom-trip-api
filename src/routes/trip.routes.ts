import { Request, Response, Router } from "express";
import tripFactory from "../factories/trip.factory";
import {
  CreatingTripRequest,
  isCreatingTripRequest,
} from "../shared/types/dto/trip/CreatingTripRequest";

const tripRouter = Router();

tripRouter.get("/:id", async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res
      .status(400)
      .send(`error parsing request params: ${err ?? "no error message"}`);
  }
});

tripRouter.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).send("miss paramters: request must contain a body");
      return;
    }

    if (!isCreatingTripRequest(req.body)) {
      res
        .status(400)
        .send("wrong parameters: body needs to be a creating trip request");
      return;
    }
    const tripRequest: CreatingTripRequest = req.body;
    try {
      res.send((await tripFactory.create(tripRequest)).toDto());
    } catch (err) {
      console.error(err);
      res.status(500).send(`error creating trip: ${err}`);
    }
  } catch (err) {
    res
      .status(400)
      .send(`error parsing request params: ${err ?? "no error message"}`);
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
