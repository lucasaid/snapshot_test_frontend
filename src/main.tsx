import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { StrictMode } from "react";
import Snapshots from "./pages/Snapshots.tsx";
import SnapshotsUpload from "./pages/SnapshotsUpload.tsx";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <Router>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="lg">
          <Routes>
            <Route index element={<Snapshots />} />
            <Route path="/upload" element={<SnapshotsUpload />} />
            <Route path="/:id" element={<SnapshotsUpload />} />
          </Routes>
      </Container>
    </QueryClientProvider>
  </StrictMode>
  </Router>
);
