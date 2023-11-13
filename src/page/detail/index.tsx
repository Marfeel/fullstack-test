import React from "react";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import ArticleDetail from "./ArticleDetail";
import TotalChart from "../../components/common/Chat";

export default function DetailPage() {
  // Assuming the parameter in the route is named "articleId"
  const { articleId } = useParams();

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ marginBottom: 2, padding: 2 }}>
        {articleId && <ArticleDetail id={articleId} />}
      </Paper>
      <Paper sx={{ padding: 2 }}>
        {/* TODO: Uncomment when ArticleList component is ready */}
        <TotalChart />
      </Paper>
    </Box>
  );
}
