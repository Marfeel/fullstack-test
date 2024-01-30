import { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { ResponseArticle } from "../interfaces/interfaces";

export const useArticle = (id: string | undefined, time: string) => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [loadingArticle, setLoadingArticle] = useState<boolean>(false);
  const [traffic, setTraffic] = useState<ResponseArticle["trafficByHours"]>([]);
  const [totalTraffic, setTotalTraffic] = useState<number>(0);
  const [articleError, setArticleError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setArticleError("Article not found");
      return;
    }
    setLoadingArticle(true);
    setArticleError("");
    const url = `${API_URL}/articles/${id}?time=${time}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: ResponseArticle) => {
        setAuthor(data.author);
        setUrl(data.url);
        setImage(data.image_url);
        setTraffic(data.trafficByHours);
        if (data.totalTraffic) setTotalTraffic(data.totalTraffic);
        setLoadingArticle(false);
      })
      .catch((error) => {
        setLoadingArticle(false);
        setArticleError("Article not found");
        console.log("error", error);
      });
  }, [id, time]);

  return {
    author,
    url,
    image,
    traffic,
    totalTraffic,
    loadingArticle,
    articleError,
  };
};
