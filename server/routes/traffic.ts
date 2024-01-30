import express from "express";
import { getAllTraffic } from "../actions/traffic";

const trafficRouter = express.Router();

trafficRouter.get("/", getAllTraffic);

export { trafficRouter };
