import { Skeleton } from "@mui/material";
export const ArticleSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" animation="wave" height={50} />
      <Skeleton variant="text" animation="wave" height={50} />
      <Skeleton variant="text" animation="wave" height={34} />
    </>
  );
};
