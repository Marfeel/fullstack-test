import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTotalTraffic } from "../../api/traffic";
import { Chart } from "..";
import { TrafficData } from "../../interfaces";
import { useParams, useSearchParams } from "react-router-dom";
import { extractTraffic, initalChart } from "../../utils/traffic";
export default function TotalChart() {
  const { articleId } = useParams();
  const [params] = useSearchParams();
  const timeframe = params.get("timeframe"); // Correctly extract the timeframe parameter

  const { data, isLoading, isError, error } = useQuery<TrafficData, Error>({
    queryKey: ["totalChart", timeframe, articleId], // Include timeframe in the queryKey for cache differentiation
    queryFn: () => getTotalTraffic({ timeframe, articleId }),
  });
  let trafficData = data;

  if (isLoading) {
    trafficData = initalChart(timeframe);
  }
  if (isError) {
    return <Alert severity="error">An error occurred: {error?.message}</Alert>;
  }

  // Ensure that data is in the expected format
  const { data: chartData, label: chartLabels } = extractTraffic(trafficData);

  return <Chart data={chartData} labels={chartLabels} title="Traffic Data" />;
}
