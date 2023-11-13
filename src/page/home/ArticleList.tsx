import React from "react";
import { CircularProgress, Stack, Alert, Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllData } from "../../api/articles";
import { ArticleData, PaginatedResponseBody } from "../../interfaces/index";
import { useInView } from "react-intersection-observer";
import { Article } from "../../components";
import { useNavigate } from "react-router-dom";

// Define the type for the response body with pagination
import { styled } from "@mui/material/styles";

// Styled Box with hover effect and clickable cursor
const ClickableBox = styled(Box)({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5", // Example hover color, adjust as needed
  },
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "10px",
});
export default function ArticleList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedResponseBody<ArticleData[]>, Error>({
    queryKey: ["articles"],
    queryFn: async ({
      pageParam,
    }): Promise<PaginatedResponseBody<ArticleData[]>> => {
      // Cast pageParam to number since its type is unknownf
      return getAllData(pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
  });
  const navigate = useNavigate();

  const { ref } = useInView({
    fallbackInView: true,
    onChange: (inView: boolean) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

    if (isLoading) return <CircularProgress />;

    if (isError && error) {
      return <Alert severity="error">An error occurred: {error.message}</Alert>;
    }

  return (
    <Stack spacing={2}>
      {data?.pages?.map((group, index) => (
        <React.Fragment key={index}>
          {group?.data?.map((article: ArticleData, idx) => (
            <ClickableBox
              ref={group.data.length === idx + 1 ? ref : null}
              key={article.id}
              onClick={() => navigate(`${article.id}`)}
            >
              <Article
                author={article.author}
                url={article.url}
                image={article.image_url}
                traffic={article.total_traffic}
              />
            </ClickableBox>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <CircularProgress />}
    </Stack>
  );
}
