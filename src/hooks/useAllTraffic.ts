import { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import type { trafficByHours } from "../interfaces/interfaces";

export const useAllTraffic = (time: string) => {
  const [traffic, setTraffic] = useState<number[]>([]);
  const [loadingTraffic, setLoadingTraffic] = useState<boolean>(false);
  const [allTrafficError, setAllTrafficError] = useState<string>("");

  useEffect(() => {
    setLoadingTraffic(true);
    setAllTrafficError("");
    const url = `${API_URL}/traffic?time=${time}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: trafficByHours) => {
        setTraffic(data);
        setLoadingTraffic(false);
      })
      .catch((error) => {
        setLoadingTraffic(false);
        setAllTrafficError("Something went wrong: unable to fetch traffic");
        console.log("error", error);
      });
  }, [time]);

  return { traffic, loadingTraffic, allTrafficError };
};
