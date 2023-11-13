import express, { Application } from "express";
import articleRouter from "./routes/article.route";
import trafficRouter from "./routes/traffic.route";
import cors from "cors";

const app: Application = express();

const port: number = 3001;
app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRouter);
app.use("/api/traffic", trafficRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
