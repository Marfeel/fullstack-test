import { useEffect, useState, useCallback } from "react";
import { API_URL } from "../config/config";
import { ResponseArticle } from "../interfaces/interfaces";

export const useAllArticles = (time: string) => {
  const [articles, setArticles] = useState<ResponseArticle[]>([]);
  const [endOfPage, setEndOfPage] = useState<boolean>(false);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [allArticlesError, setAllArticlesError] = useState<string>("");

  useEffect(() => {
    setPage(1);
    setEndOfPage(false);
    setAllArticlesError("");
  }, [time]);

  const fetchArticles = useCallback(
    (page: number) => {
      setLoadingArticles(true);
      const url = `${API_URL}/articles?time=${time}&page=${page}`;
      fetch(url)
        .then((response) => {
          if (response.status === 404) {
            return [];
          } else if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((data: ResponseArticle[]) => {
          if (data.length === 0) {
            setEndOfPage(true);
          } else {
            setArticles((a) => (page === 1 ? [...data] : [...a, ...data]));
          }
          setLoadingArticles(false);
        })
        .catch((error) => {
          setEndOfPage(true);
          setLoadingArticles(false);
          setAllArticlesError("Something went wrong: unable to fetch articles");
          console.log("error", error);
        });
    },
    [time]
  );

  const loadNextPage = useCallback(() => {
    if (endOfPage) return;
    fetchArticles(page + 1);
    setPage((p) => p + 1);
  }, [endOfPage, page, fetchArticles]);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  return {
    articles,
    endOfPage,
    loadNextPage,
    loadingArticles,
    allArticlesError,
  };
};
