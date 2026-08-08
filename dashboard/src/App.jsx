import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";

function App() {
    // Ilk renderde sadece public sehifeler var: login, register, admin login.
    const [allRoutes, setAllRoutes] = useState([...publicRoutes])
    // console.log(allRoutes)

    useEffect(() => {
        // Private route-lar MainLayout-un children-i kimi elave olunur.
        // Netice: public route-lar ayridir, dashboard sehifeleri ise layout icinde acilir.
        const routes = getRoutes()
        setAllRoutes([...allRoutes,routes])
    },[])


    return <Router allRoutes={allRoutes} /> 
}

export default App;
