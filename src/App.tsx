import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyle from "./globalStyle";
import Bookings from "./Page/Bookings";
import Cabins from "./Page/Cabins";
import Dashboard from "./Page/Dashboard";
import Settings from "./Page/Settings";
import Users from "./Page/Users";
import AppLayout from "./ui/AppLayout";
import Notification from "./ui/ToastSettings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Bookings />} path="/Bookings" />
            <Route element={<Cabins />} path="/cabins" />
            <Route element={<Users />} path="/users" />
            <Route element={<Settings />} path="/settings" />
          </Route>
        </Routes>
      </BrowserRouter>
      <Notification />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
