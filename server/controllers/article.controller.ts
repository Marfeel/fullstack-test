import { Request, Response, NextFunction } from "express";
import { ArticleData, PaginatedResponseBody } from "../interfaces";

// Assuming data is loaded here from your JSON file
import { rawData as trafficData, sortedData } from "../datasource";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Implement pagination logic
    // Assuming sortedData is an array of articles
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = sortedData.slice(startIndex, endIndex);
    const nextPage = endIndex < sortedData.length ? page + 1 : null;
    const response: PaginatedResponseBody<typeof paginatedData> = {
      data: paginatedData,
      nextPage: nextPage,
    };
    res.send(response);
  } catch (err) {
    next(err);
  }
};
const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articleId = req.params.id;
    const article = trafficData.traffic_data.find(
      (item: ArticleData) => item.id === articleId
    );

    if (article) {
      res.send(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (err) {
    next(err);
  }
};

export { getAll, getOne };
