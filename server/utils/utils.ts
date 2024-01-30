import { Article, DailyTraffic } from "../interfaces/interfaces";

// return an array of the days selected by the filter
export const getDays = (time: string): number[] => {
  const today = new Date().getDate() - 1;
  switch (time) {
    case "yesterday":
      const yesterday = today > 0 ? today - 1 : 30;
      return [yesterday];
    case "last 7 days":
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(today - i >= 0 ? today - i : 31 + (today - i));
      }
      return week;
    case "this month":
      return [...Array.from({ length: 31 }, (_, i) => i)];
    default:
      // today
      return [today];
  }
};

// for a single article, it returns an array of the traffic for the days selected by the filter
export const getDaysTraffic = (
  article: Article,
  days: number[]
): DailyTraffic[] => {
  return article.daily_traffic.filter((daily) => {
    return days.includes(daily.day);
  });
};

//  for all articles, it returns an array of the hourly traffic of the days selected by the filter
export const accumulateTrafficByHours = (
  Articles: Article[],
  time: string
): number[] => {
  const days = getDays(time);
  const trafficByHours = Array.from({ length: 24 }, () => 0);
  Articles.forEach((article) => {
    const daysTraffic = getDaysTraffic(article, days);
    daysTraffic.forEach((daily) => {
      daily.hourly_traffic.forEach((hourly) => {
        trafficByHours[hourly.hour] += hourly.traffic;
      });
    });
  });
  return trafficByHours;
};

// for a single article, it returns the total traffic of the days selected by the filter
export const accumulateAllTraffic = (
  article: Article,
  time: string
): number => {
  const days = getDays(time);
  let totalTraffic = 0;
  const daysTraffic = getDaysTraffic(article, days);
  daysTraffic.forEach((daily) => {
    daily.hourly_traffic.forEach((hourly) => {
      totalTraffic += hourly.traffic;
    });
  });
  return totalTraffic;
};
