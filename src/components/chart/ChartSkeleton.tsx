import { Skeleton } from "@mui/material";
export const ChartSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" animation="wave" height={300} />
      <Skeleton variant="text" animation="wave" height={50} />
    </>
  );
};
