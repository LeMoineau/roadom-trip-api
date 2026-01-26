import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import "./config/init";
import router from "./routes/routes";

const app: Express = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT;

app.use(jsonParser);
app.use(cors());
app.use(router);
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
