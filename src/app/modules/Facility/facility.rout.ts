import express from 'express';
import { FacilityControler } from './facility.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { facilityValidationSchema } from './facility.validation';

const rout = express.Router();

rout.post('/', valideteRequest(facilityValidationSchema),FacilityControler.creatFacility);

export const FacilityRoutes = rout;
