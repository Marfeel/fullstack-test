import { Box, Paper, Alert } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import {
  Article,
  Chart,
  ArticleSkeleton,
  ChartSkeleton,
} from "../../components";
import { useArticle } from "../../hooks";

export const ArticlePage = () => {
  const { id } = useParams();
  const search = useLocation().search;
  const time = new URLSearchParams(search).get("time") || "today";
  const {
    author,
    url,
    image,
    traffic,
    totalTraffic,
    loadingArticle,
    articleError,
  } = useArticle(id, time);

  const labels = Array.from(Array(24).keys()).map((i) => i.toString());
  return (
    <Box sx={{ padding: 2 }}>
      {articleError && (
        <Paper sx={{ marginBottom: 2, marginTop: 2, padding: 0 }}>
          <Alert severity="error">{articleError}</Alert>
        </Paper>
      )}
      {!articleError && (
        <>
          <Paper
            sx={{ marginBottom: 2, marginTop: 2, padding: 0 }}
            role="single-article"
          >
            {loadingArticle && <ArticleSkeleton />}
            {!loadingArticle && (
              <Article
                author={author}
                url={url}
                image={image}
                traffic={totalTraffic}
              />
            )}
          </Paper>
          <Paper sx={{ padding: 2 }}>
            {loadingArticle && <ChartSkeleton />}
            {!loadingArticle && (
              <Chart labels={labels} data={traffic || []} title={"Traffic"} />
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};
