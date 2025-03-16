import { RouteObject, useRoutes } from "react-router";
import { CardRoute, HomeRoute, OrdersRoute } from "./config";
import Home from "../pages/Home";
import AboutCard from "../pages/AboutCard";
import Orders from "../pages/Orders";

const Router = () => {
  const basedPath: RouteObject[] = [
    {
      children: [
        { path: HomeRoute, element: <Home /> },
        { path: OrdersRoute, element: <Orders /> },
        { path: CardRoute, element: <AboutCard /> },
      ],
    },
  ];

  return useRoutes(basedPath);
};

export default Router;
