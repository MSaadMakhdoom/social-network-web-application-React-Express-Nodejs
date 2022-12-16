import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CommunityRegister from "./pages/community/register/Register";

import CommunityLogin from "./pages/community/login/Login";
import LeftBar from "./components/leftBar/LeftBar";

import
{
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";


import CommunityHome from "./pages/community/home/Home.jsx";
import CommunityProfile from "./pages/community/profile/Profile";
import "./style.scss";

function App()
{
  const Layout = () =>
  {
    return (
      <div className={`theme-${"" ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };




  const CommunityLayout = () =>
  {
    return (
      <div className={`theme-${"" ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>

        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
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
      path: "/communityRegister",
      element: <CommunityRegister />,
    },
    {
      path: "/communityLogin",
      element: <CommunityLogin />,
    },
    {
      path: "/Community",
      element: <CommunityLayout />,
      children: [
        {
          path: "/Community",
          element: <CommunityHome />,
        },
        {
          path: "/Communityprofile/:id",
          element: <CommunityProfile />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
