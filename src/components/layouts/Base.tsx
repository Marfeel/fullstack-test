import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import { AppBar } from "../app-bar";

import { Container } from "@mui/material";

export const BaseLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar title="Traffic" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          marginTop: "64px",
        }}
      >
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};
