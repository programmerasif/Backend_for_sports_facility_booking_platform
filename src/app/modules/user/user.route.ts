import express from 'express';
import { usersControler } from './user.controler';
import { userValidationSchema } from './user.validation';
import valideteRequest from '../../middlewars/valideteRequest';

const rout = express.Router();

rout.post(
  '/creat-user',
  valideteRequest(userValidationSchema),
  usersControler.creatUser
);

export const UserRoutes = rout;
