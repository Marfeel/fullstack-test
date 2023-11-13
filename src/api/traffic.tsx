import { apiUrl } from "../config";

export const getTotalTraffic = async ({
  timeframe,
  articleId,
}: {
  timeframe: string | null;
  articleId?: string;
}) => {
  const response = await fetch(
    `${apiUrl}/traffic?timeframe=${timeframe ?? "today"}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
