import { TrafficData } from "../interfaces";
import { getDaysInCurrentMonth, getLastWeekDays } from "./date";

export const initialiseTrafficObject = (size: number, defaultValue: number) => {
  return Array.from({ length: size }, (_, i) => i.toString()).reduce(
    (acc, curr) => {
      acc[curr] = defaultValue;
      return acc;
    },
    {} as TrafficData
  );
};
export const extractTraffic = (data: TrafficData | undefined) => {
  const chartLabels = data ? Object.keys(data) : [];
  const chartData: number[] = data ? Object.values(data) : [];
  return { label: chartLabels, data: chartData };
};
export const initalChart = (timeframe: string | null) => {
  let traffic: TrafficData = {};
  if (timeframe === "today" || timeframe === "yesterday") {
    traffic = initialiseTrafficObject(24, 0);
  } else if (timeframe === "last week" || timeframe === "this month") {
    const days =
      timeframe === "last week" ? getLastWeekDays() : getDaysInCurrentMonth();
    days.forEach((day: number) => (traffic[day] = 0));
  }
  return traffic;
};
