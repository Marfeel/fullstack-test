import express, { Application } from "express";
import { articleRouter } from "./routes/article";
import { trafficRouter } from "./routes/traffic";
import { API_PORT } from "./config/config";

const app: Application = express();
const port: number = API_PORT;

// CORS middleware
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/articles", articleRouter);
app.use("/api/traffic", trafficRouter);

app.get("/", (req, res) => {
  res
    .status(500)
    .send(
      "Something went wrong. Go to <a href='/traffic'>/traffic</a> to get all traffic and articles sorted by traffic"
    );
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
