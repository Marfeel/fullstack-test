export interface IHourlyTraffic {
  hour: number;
  traffic: number;
}

export interface IDailyTraffic {
  day: number;
  hourly_traffic: IHourlyTraffic[];
}

export interface ArticleData {
  id: string;
  url: string;
  author: string;
  image_url: string;
  geo: string;
  daily_traffic: IDailyTraffic[];
  total_traffic: number;
}
export type TrafficData = {
  [key: string]: number; // Allow any string as key, but values must be numbers
};
export interface PaginatedResponseBody<T> {
  data: T;
  nextPage: number | null;
}
