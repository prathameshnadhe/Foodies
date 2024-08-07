import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";
import Error from "./components/Error/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";

// Chunking
// Code Splitting
// Dynamic bundling
// Lazy Loading
// On demand loading

const Grocery = lazy(() => import("./components/Grocery/Grocery"));

const AboutUs = lazy(() => import("./components/AboutUs"));


const AppLayout = () => {
  // authentication
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Prathamesh",
    };
    setUserName(data.name);
  });
  
  return (
    <UserContext.Provider value={{ loggedInUser: userName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
