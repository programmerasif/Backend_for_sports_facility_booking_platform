import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const route = Router();

const moduleRouts = [
  {
    path: '/user',
    route: UserRoutes,
  },
];
moduleRouts?.forEach(routes => route.use(routes.path, routes.route)); //here im using for each to avoid DRY all the route and path will coming ans set here like route.use("/Example",exampleRoutes)

export default route;
