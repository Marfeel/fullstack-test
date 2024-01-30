import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BaseLayout } from "./components";
import { HomePage, ArticlePage, ErrorPage } from "./pages";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import {} from "react-router-dom";

const mdTheme = createTheme();

const router = createBrowserRouter([
  {
    // parent route component
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    errorElement: <ErrorPage />,
    // child route components
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/article/:id",
        element: <ArticlePage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
