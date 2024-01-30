import { Box, Paper, Button, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Article,
  Chart,
  ArticleSkeleton,
  ChartSkeleton,
} from "../../components";

import { useAllArticles, useAllTraffic } from "../../hooks";

export const HomePage = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const time = new URLSearchParams(search).get("time") || "today";

  const {
    articles,
    endOfPage,
    loadNextPage,
    loadingArticles,
    allArticlesError,
  } = useAllArticles(time);
  const { traffic, loadingTraffic, allTrafficError } = useAllTraffic(time);

  const labels = Array.from(Array(24).keys()).map((i) => i.toString());
  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ marginBottom: 2, marginTop: 2, padding: 2 }}>
        {allTrafficError && <Alert severity="error">{allTrafficError}</Alert>}
        {!allTrafficError && loadingTraffic && <ChartSkeleton />}
        {!allTrafficError && !loadingTraffic && (
          <div role="presentation">
            <Chart labels={labels} data={traffic} title={"Traffic"} />
          </div>
        )}
      </Paper>
      <Paper sx={{ marginBottom: 2, marginTop: 2, padding: 2 }}>
        {articles.map((article) => {
          const url = `/article/${article.id}` + (time ? `?time=${time}` : "");
          return (
            <article
              key={article.id}
              onClick={() => navigate(url)}
              style={{ cursor: "pointer" }}
            >
              <Article
                author={article.author}
                url={article.url}
                image={article.image_url}
                traffic={article.totalTraffic || 0}
              />
            </article>
          );
        })}

        {loadingArticles && <ArticleSkeleton />}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {articles.length > 0 && !endOfPage && (
            <Button
              onClick={() => loadNextPage()}
              style={{ cursor: "pointer", marginTop: "10px" }}
            >
              Load more articles
            </Button>
          )}
          {!allArticlesError && articles.length === 0 && <div>No articles</div>}
          {!allArticlesError && endOfPage && <div>End of page</div>}
        </div>
        {allArticlesError && <Alert severity="error">{allArticlesError}</Alert>}
      </Paper>
    </Box>
  );
};
