import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const creatFacilityIntoDB = async (payLoad: TFacility) => {
  const result = await Facility.create(payLoad);
  return result;
};
const updateFacilityIntoDB = async (
  id: string,
  payLoad: Partial<TFacility>,
) => {
  const { ...updateData } = payLoad;
  

  const result = await Facility.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return result;
};
const deleteFacilityIntoDB = async (
  id: string,
) => {
  

  const result = await Facility.findOneAndUpdate({ _id: id },{isDeleted:true},{
    new: true,
    runValidators: true,
    upsert: true,
  });
  return result;
};

const getAllFacilityIntoDB = async () => {
  const result = await Facility.find();
  return result;
};
export const FacalityServices = {
  creatFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityIntoDB,
  getAllFacilityIntoDB
};
