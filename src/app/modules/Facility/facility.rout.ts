import express from 'express';
import { FacilityControler } from './facility.controler';

const rout = express.Router();

rout.post('/', FacilityControler.creatFacility);

export const FacilityRoutes = rout;
