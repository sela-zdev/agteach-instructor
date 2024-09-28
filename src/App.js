import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./route/index";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { useIsLoginQuery } from "./services/api/authApi";
import { checkLoginStatus } from "./features/user/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useIsLoginQuery();

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(checkLoginStatus(data.IsAuthenticated));
    }
  }, [data, isLoading, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
