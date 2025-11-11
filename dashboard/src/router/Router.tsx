import { useRoutes } from "react-router-dom";
const Router = ({ allRoutes }:any) => {
  const routes = useRoutes([...allRoutes]);
  return routes;
};

export default Router;
