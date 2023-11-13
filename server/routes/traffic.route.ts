import express from "express";
import * as TrafficController from "../controllers/traffic.controller";

const router = express.Router();

router.get("/", TrafficController.get);

export default router;
