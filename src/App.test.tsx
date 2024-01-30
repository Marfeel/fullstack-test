import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders app properly", () => {
  render(<App />);

  expect(true).toBeTruthy();
});

test("end to end test", async () => {
  render(<App />);

  // wait to load all first 10 articles
  await waitFor(() => {
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(10);
  });
  // wait to load the main chart
  await waitFor(() => {
    const mainChart = screen.getByRole("presentation");
    expect(mainChart).toBeInTheDocument();
  });

  // click on the third article
  const articles = screen.getAllByRole("article")[2];
  fireEvent.click(articles);

  // wait to load the single article page
  await waitFor(() => {
    const singleArticle = screen.getByRole("single-article");
    expect(singleArticle).toBeInTheDocument();
  });
});
