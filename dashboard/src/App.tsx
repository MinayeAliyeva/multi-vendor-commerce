import { useState } from "react";
import "./App.css";
import Router from "./router/Router";
import publiicRoutes from "./router/routes/publicRoutes";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publiicRoutes]);
  console.log(allRoutes)
  return <Router allRoutes={allRoutes}/>
}

export default App;
