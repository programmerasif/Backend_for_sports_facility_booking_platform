import express from 'express';
import { usersControler } from './user.controler';

const rout = express.Router();

rout.post(
  '/creat-user',
  usersControler.creatUser
);

export const UserRoutes = rout;
