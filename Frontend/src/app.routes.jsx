import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected';

import Home from "./features/home/pages/Home";
import ManageSongs from "./features/home/pages/ManageSongs";
import MainLayout from './features/shared/components/MainLayout';

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <Protected><MainLayout /></Protected>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/manage-songs",
        element: <ManageSongs />
      }
    ]
  }
])

export default appRouter