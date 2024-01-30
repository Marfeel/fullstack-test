import express from "express";
import { getAllArticles, getArticle } from "../actions/article";

const articleRouter = express.Router();

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticle);

export { articleRouter };
