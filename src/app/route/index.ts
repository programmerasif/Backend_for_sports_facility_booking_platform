import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.rout';
import { FacilityRoutes } from '../modules/Facility/facility.rout';
import { ChackAvailityRoutes } from '../modules/bookingModel/bookingModel.rout';

const route = Router();

const moduleRouts = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/',
    route: ChackAvailityRoutes,
  },
];
moduleRouts?.forEach(routes => route.use(routes.path, routes.route)); //here im using for each to avoid DRY all the route and path will coming ans set here like route.use("/Example",exampleRoutes)

export default route;
