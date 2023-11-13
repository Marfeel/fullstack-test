import { Request, Response, NextFunction } from "express";

// Assuming data is loaded here from your JSON file
import { analyseData } from "../datasource";

const get = async (req: Request, res: Response, next: NextFunction) => {
  const timeFrame = (req.query.timeframe as string) || "today";
  const articleId = req.query.articleId as string;

  try {
    const data = await analyseData(timeFrame, articleId);
    res.send(data);
  } catch (error) {
    next(error);
  }
};
export { get };
