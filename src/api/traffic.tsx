import { apiUrl } from "../config";

export const getTotalTraffic = async ({
  timeframe,
  articleId,
}: {
  timeframe: string | null;
  articleId?: string;
}) => {
  const searchParams = new URLSearchParams();
  searchParams.set("timeframe", timeframe ?? "today");
  if (articleId) searchParams.set("articleId", articleId);
  const response = await fetch(`${apiUrl}/traffic?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
