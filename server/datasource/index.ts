import { ArticleData, ArticleWithTotal, TrafficData } from "../interfaces";
import rawData from "../dataset.json";
import { getLastWeekDays, getDaysInCurrentMonth } from "../utils/date";
import { initialiseTrafficObject } from "../utils/traffic";

interface ITrafficData {
  traffic_data: ArticleData[];
}

const data: ITrafficData = rawData;

const calculateTotalTraffic = (articles: ArticleData[]): ArticleWithTotal[] => {
  return articles.map((article) => {
    const totalTraffic = article.daily_traffic.reduce(
      (total, day) =>
        total +
        day.hourly_traffic.reduce(
          (dayTotal, hour) => dayTotal + hour.traffic,
          0
        ),
      0
    );

    return { ...article, total_traffic: totalTraffic };
  });
};

const analyseData = async (
  timeframe: string,
  articleId?: string
): Promise<TrafficData> => {
  let traffic: TrafficData = {};
  if (timeframe === "today" || timeframe === "yesterday") {
    const currentDate = new Date();
    traffic = initialiseTrafficObject(24, 0);
    if (timeframe === "yesterday") {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    const day = currentDate.getDate();

    data.traffic_data.forEach((article) => {
      if ((articleId && article.id === articleId) || !articleId)
        article.daily_traffic.forEach((daily) => {
          if (daily.day === day) {
            daily.hourly_traffic.forEach((t) => {
              traffic[t.hour.toString()] += t.traffic;
            });
          }
        });
    });
  } else if (timeframe === "last week" || timeframe === "this month") {
    const days =
      timeframe === "last week" ? getLastWeekDays() : getDaysInCurrentMonth();
    days.forEach((day) => (traffic[day] = 0));

    data.traffic_data.forEach((article) => {
      if ((articleId && article.id === articleId) || !articleId)
        article.daily_traffic.forEach((daily) => {
          if (days.includes(daily.day)) {
            daily.hourly_traffic.forEach((t) => {
              traffic[daily.day.toString()] += t.traffic;
            });
          }
        });
    });
  } else {
    throw new Error("Invalid timeframe specified");
  }

  return traffic;
};

const sortedData = calculateTotalTraffic(data.traffic_data).sort(
  (a, b) => b.total_traffic - a.total_traffic
);

export { sortedData, analyseData, rawData };
