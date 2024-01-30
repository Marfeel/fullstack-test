import { Request, Response, NextFunction } from "express";
import { articles } from "../data/data";
import { accumulateTrafficByHours } from "../utils/utils";

export const getAllTraffic = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!articles) {
    res.status(404).send("Articles not found");
    return;
  }
  try {
    let { time } = req.query;
    if (!time) time = "today";

    const trafficByHours = accumulateTrafficByHours(
      articles.traffic_data,
      time as string
    );

    res.json(trafficByHours);
  } catch (err) {
    next(err);
  }
};
