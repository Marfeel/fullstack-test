import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BaseLayout } from "./components";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Detail from "./page/detail";
import Home from "./page/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const mdTheme = createTheme();

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    // Define child routes here if any
    children: [
      {
        path: "/", // Root path for Home Page
        element: <Home />,
        index: true, // Marks this route as the index route
      },
      {
        path: "/:articleId", // Path for Detail Page
        element: <Detail />,
      },
    ],
  },
  // You can add more routes here
]);

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
