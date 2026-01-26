import { Request, Response, Router } from "express";
import tripRouter from "./trip.routes";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("roadom-trip-api ready!");
});

router.use("/trips", tripRouter);

export default router;
