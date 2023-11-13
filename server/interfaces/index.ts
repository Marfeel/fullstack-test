/**
 * Represents hourly traffic data.
 */
export interface HourlyTraffic {
  hour: number; // Hour of the day (0-23)
  traffic: number; // Traffic count for the hour
}

/**
 * Represents daily traffic data.
 */
export interface DailyTraffic {
  day: number; // Day of the month
  hourly_traffic: HourlyTraffic[]; // Array of hourly traffic data
}

/**
 * Represents the structure of an article with traffic data.
 */
export interface ArticleData {
  id: string; // Unique identifier for the article
  url: string; // URL of the article
  author: string; // Author of the article
  image_url: string; // URL of the article's image
  geo: string; // Geographical identifier
  daily_traffic: DailyTraffic[]; // Array of daily traffic data
}

/**
 * Extends ArticleData with total traffic.
 */
export interface ArticleWithTotal extends ArticleData {
  total_traffic: number; // Total traffic for the article
}
export type TrafficData = {
  [key: string]: number; // Allow any string as key, but values must be numbers
};
export interface PaginatedResponseBody<T> {
  data: T;
  nextPage: number | null;
}
