import React from "react";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "../NavBar";
import StickyFooter from "../StickyFooter";
import ToggleColorMode from "../../ToggleColorMode";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToggleColorMode>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CssBaseline />
          <NavBar />
          <Container component="main" sx={{ mt: 8, mb: 4 }} maxWidth="xl">
            <Outlet />
          </Container>
          <StickyFooter />
        </Box>
      </ToggleColorMode>
    </QueryClientProvider>
  );
};

export default Layout;
