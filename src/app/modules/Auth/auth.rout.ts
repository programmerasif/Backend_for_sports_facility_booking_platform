import express from 'express';
import { AuthControler } from './auth.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { loginValidationSchema } from './auth.validation';
import { userValidationSchema } from '../user/user.validation';
import { usersControler } from '../user/user.controler';
import auth from '../../middlewars/authValidation';
const router = express.Router();


router.post(
    '/login',
    valideteRequest(loginValidationSchema),
    AuthControler.loginUser,
  );
  router.post(
    '/userSignup',
    valideteRequest(userValidationSchema),
    usersControler.creatUser
  );
  router.post(
    '/adminSignup',
    auth('admin'),
    valideteRequest(userValidationSchema),
    usersControler.createAdmin
  );
  export const AuthRoutes = router;