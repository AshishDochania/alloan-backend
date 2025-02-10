import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppRoutes from "./Routes";

const theme = createTheme({
  palette: {
    mode: "light", // Change to "dark" for dark mode
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
