import React from "react";
import { Box, Paper } from "@mui/material";
import TotalChart from "../../components/common/Chat";
import ArticleList from "./ArticleList";
export default function Home() {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ marginBottom: 2, padding: 2 }}>
        <TotalChart />
      </Paper>
      <Paper
        sx={{
          padding: 2,
        }}
      >
        <ArticleList />
      </Paper>
    </Box>
  );
}
