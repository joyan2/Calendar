import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";

import CreateEvent from "./components/create_event";
import CreateReminder from "./components/create_reminder";

import Account from "./components/account";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

import { TimezoneProvider } from './TimezoneContext'; 
import { ThemeProvider} from './ThemeContext';



function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/create_event",
      element: <CreateEvent />,
    },
    {
      path: "/create_reminder",
      element: <CreateReminder />,
    },
    {
      path: "/account",
      element: <Account />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <ThemeProvider>
        <AuthProvider>
          <TimezoneProvider>
            <Header />
            <div className="w-full h-screen flex flex-col">{routesElement}</div>
          </TimezoneProvider>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;