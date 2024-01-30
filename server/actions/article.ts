import { Request, Response, NextFunction } from "express";
import { articles } from "../data/data";
import { accumulateTrafficByHours, accumulateAllTraffic } from "../utils/utils";
import { ITEMS_PER_PAGE } from "../config/config";
import { Article, ArticleResponse } from "../interfaces/interfaces";

export const getArticle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let { time } = req.query;
    if (!time) time = "today";

    const article = articles?.traffic_data?.find((art: Article) => {
      return art.id === id;
    });

    if (!article) {
      res.status(404).send("Article not found");
      return;
    }
    const trafficByHours = accumulateTrafficByHours([article], time as string);
    const totalTraffic = accumulateAllTraffic(article, time as string);
    const articleData: ArticleResponse = {
      id: article.id,
      url: article.url,
      author: article.author,
      image_url: article.image_url,
      trafficByHours,
      totalTraffic,
    };
    res.json(articleData);
  } catch (err) {
    next(err);
  }
};

export const getAllArticles = (
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

    let page = Number(req.query.page);
    if (!page || page < 0) page = 1;

    const articlesData = articles.traffic_data.map((article: Article) => {
      const totalTraffic = accumulateAllTraffic(article, time as string);
      const articleResponse: ArticleResponse = {
        id: article.id,
        url: article.url,
        author: article.author,
        image_url: article.image_url,
        totalTraffic,
      };
      return articleResponse;
    });

    articlesData.sort((a: ArticleResponse, b: ArticleResponse) => {
      return b.totalTraffic - a.totalTraffic;
    });

    const articlesDataPaginated = articlesData.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

    if (articlesDataPaginated.length === 0) {
      res.status(404).send("Articles not found");
      return;
    }
    res.json(articlesDataPaginated);
  } catch (err) {
    next(err);
  }
};
