import express from 'express';
import { AuthControler } from './auth.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { loginValidationSchema } from './auth.validation';
import { userValidationSchema } from '../user/user.validation';
import { usersControler } from '../user/user.controler';
const router = express.Router();


router.post(
    '/login',
    valideteRequest(loginValidationSchema),
    AuthControler.loginUser,
  );
  router.post(
    '/signup',
    valideteRequest(userValidationSchema),
    usersControler.creatUser
  );
  export const AuthRoutes = router;