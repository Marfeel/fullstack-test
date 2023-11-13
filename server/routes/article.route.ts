import express from "express";
import * as ArticleController from "../controllers/article.controller";

const router = express.Router();

router.get("/", ArticleController.getAll);

router.get("/:id", ArticleController.getOne);

export default router;
