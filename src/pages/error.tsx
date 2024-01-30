import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page not found</Typography>
      <Link to="/">Go to home page</Link>
    </Box>
  );
};
