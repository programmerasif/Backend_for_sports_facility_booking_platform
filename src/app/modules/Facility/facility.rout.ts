import express from 'express';
import { FacilityControler } from './facility.controler';
import valideteRequest from '../../middlewars/valideteRequest';
import { facilityUpdatedValidationSchema, facilityValidationSchema } from './facility.validation';
import auth from '../../middlewars/authValidation';

const rout = express.Router();

rout.post(
  '/',
  auth('admin'),
  valideteRequest(facilityValidationSchema),
  FacilityControler.creatFacility,
);
rout.put(
  '/:id',
  auth('admin'),
  valideteRequest(facilityUpdatedValidationSchema),
  FacilityControler.updateFacility,
);

export const FacilityRoutes = rout;
