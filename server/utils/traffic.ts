import { TrafficData } from "../interfaces";

export const initialiseTrafficObject = (size: number, defaultValue: number) => {
  return Array.from({ length: size }, (_, i) => i.toString()).reduce(
    (acc, curr) => {
      acc[curr] = defaultValue;
      return acc;
    },
    {} as TrafficData
  );
};
