import { lazy } from "react";

const Login=lazy(()=>import("../../views/auth/Login"))
const Register=lazy(()=>import("../../views/auth/Register"))
const publiicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
export default publiicRoutes;
