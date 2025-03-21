import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyle from "./globalStyle";
import Account from "./Page/Account";
import Booking from "./Page/Booking";
import Bookings from "./Page/Bookings";
import Cabins from "./Page/Cabins";
import Check from "./Page/Check";
import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";
import Settings from "./Page/Settings";
import Users from "./Page/Users";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Notification from "./ui/ToastSettings";

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Bookings />} path="/Bookings" />
              <Route element={<Cabins />} path="/cabins" />
              <Route element={<Users />} path="/users" />
              <Route element={<Settings />} path="/settings" />

              <Route element={<Booking />} path="/bookings/:bookingId" />
              <Route element={<Check />} path="/check/:bookingId" />
              <Route element={<Account />} path="/account" />
            </Route>

            <Route element={<Login />} path="login"></Route>
            <Route element={<p>NOT FOUND</p>} path="*" />
          </Routes>
        </BrowserRouter>
        <Notification />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
