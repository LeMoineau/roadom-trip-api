import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import "./config/init";
import router from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swagger-config";

const app: Express = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT ?? 3001;

app.use(jsonParser);
app.use(cors());
app.use(express.static(`./public`));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
