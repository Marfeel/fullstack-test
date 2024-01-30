export interface Dataset {
  traffic_data: Article[];
}

export interface Article {
  id: string;
  url: string;
  author: string;
  image_url: string;
  geo: Geo;
  daily_traffic: DailyTraffic[];
}

export interface DailyTraffic {
  day: number;
  hourly_traffic: HourlyTraffic[];
}

export interface HourlyTraffic {
  hour: number;
  traffic: number;
}

export enum Geo {
  Es = "ES",
  Fr = "FR",
  It = "IT",
  Us = "US",
}

export interface ArticleResponse {
  id: string;
  url: string;
  author: string;
  image_url: string;
  totalTraffic: number;
  trafficByHours?: number[];
}
