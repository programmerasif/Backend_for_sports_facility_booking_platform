import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const creatFacilityIntoDB = async (payLoad: TFacility) => {
  const result = await Facility.create(payLoad);
  return result;
};
export const FacalityServices = {
  creatFacilityIntoDB,
};
