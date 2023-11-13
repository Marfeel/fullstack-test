import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api/articles";
import { ArticleData } from "../../interfaces";
import { Alert, CircularProgress } from "@mui/material";
import { Article } from "../../components";

export default function ArticleDetail({ id }: { id: string }) {
  
  const { data, isLoading, isError, error } = useQuery<ArticleData, Error>({
    queryKey: ["articleDetail", id],
    queryFn: () => getDetail(id),
  });

  if (isLoading) return <CircularProgress />;

  if (isError && error) {
    return <Alert severity="error">An error occurred: {error.message}</Alert>;
  }

  return data ? (
    <Article
      author={data.author}
      url={data.url}
      image={data.image_url}
      traffic={data.total_traffic}
    />
  ) : null;
}
