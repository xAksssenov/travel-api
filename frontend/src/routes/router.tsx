import { RouteObject, useRoutes } from "react-router";
import { CardRoute, HomeRoute } from "./config";
import Home from "../pages/Home";
import AboutCard from "../pages/AboutCard";

const Router = () => {
  const basedPath: RouteObject[] = [
    {
      children: [
        { path: HomeRoute, element: <Home /> },
        { path: CardRoute, element: <AboutCard /> },
      ],
    },
  ];

  return useRoutes(basedPath);
};

export default Router;
