import { apiUrl } from "../config";
import { ArticleData, PaginatedResponseBody, TrafficData } from "../interfaces";

export const getAllData = async (
  page: number | undefined = 1,
  limit: number = 10
): Promise<PaginatedResponseBody<ArticleData[]>> => {
  const response = await fetch(
    `${apiUrl}/articles?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export const getDetail = async (id: string): Promise<ArticleData> => {
  const response = await fetch(`${apiUrl}/articles/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
