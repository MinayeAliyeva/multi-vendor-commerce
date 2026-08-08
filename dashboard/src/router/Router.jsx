import { useRoutes } from 'react-router-dom';

const Router = ({allRoutes}) => {

    // useRoutes array formasinda verilen route config-i oxuyub uygun componenti qaytarir.
    const routes = useRoutes([...allRoutes])
    return routes;
     
};

export default Router;
