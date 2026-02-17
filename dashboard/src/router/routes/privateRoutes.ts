import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sailerRoutes";

export const privateRoutes = [...adminRoutes, ...sellerRoutes];