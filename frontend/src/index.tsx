import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
<<<<<<< HEAD
=======
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
>>>>>>> 9e4732cec29f989c0c48743fac0ceee607551055

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
<<<<<<< HEAD

=======
const queryClient = new QueryClient();
>>>>>>> 9e4732cec29f989c0c48743fac0ceee607551055
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>,
);
