export interface ResponseArticle {
  id: string;
  url: string;
  author: string;
  image_url: string;
  totalTraffic?: number;
  trafficByHours?: number[];
}

export type trafficByHours = number[];
