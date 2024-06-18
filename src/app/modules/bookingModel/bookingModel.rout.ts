import express from 'express';
import { checkAvailabilityControler } from './bookingModel.controler';


const rout = express.Router();

rout.get(
  '/check-availability',
  checkAvailabilityControler.checkAvailability
);

export const ChackAvailityRoutes = rout;
