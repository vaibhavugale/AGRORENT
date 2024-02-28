import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Contact from "./pages/contact/Contact";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/Login/Login";
import About from "./pages/about/About"
import Error from "./components/common/Error/Error";
import Signup from "./components/Signup/Signup";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import {Toaster} from "react-hot-toast"
import Profile from "./components/profile/Profile";
import AddEquipment from "./components/AddEquipment/AddEquipment";
import Account from "./components/Account/Account";
import History from "./components/History/History";
import Setting from "./components/Setting/Setting";
import UserEquCard from "./components/core/UserEquCard/UserEquCard";
import Search from "./components/core/Search/index"
import BookRequestMOdal from "./components/core/BookRequestModal/BookRequestMOdal";
const appRoutes = createBrowserRouter([
  {
    element: (
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "/signup",
        element: <Signup />,
        errorElement: <Error />,
      },
      {
        element: <Profile />,
        children:[
          {
            path:"/profile/account",
            element:<Account/>,
            errorElement:<Error/>

          },
          {
            path:"/profile/equipment",
            element:<AddEquipment/>,
            errorElement:<Error/>

          },
          {
            path:"/profile/history",
            element:<History/>,
            errorElement:<Error/>

          },
          {
            path:"/profile/setting",
            element:<Setting/>,
            errorElement:<Error/>
          },
          {
            path:"/profile/user-product",
            element:<UserEquCard/>,
            errorElement:<Error/>
          }
        ]  ,
        errorElement: <Error />,   
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path:"/search",
        element:<Search />
      },{
        path:"/accept-bookRequest/:id",
        element:<BookRequestMOdal />
      }
      
    ],
    errorElement: <Error />,
  },
]);

// addingfor texting branch working
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
