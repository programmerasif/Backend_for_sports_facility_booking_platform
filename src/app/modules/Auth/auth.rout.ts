import express from 'express';
import { AuthControler } from './auth.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { loginValidationSchema } from './auth.validation';
const router = express.Router();


router.post(
    '/login',
    valideteRequest(loginValidationSchema),
    AuthControler.loginUser,
  );

  export const AuthRoutes = router;