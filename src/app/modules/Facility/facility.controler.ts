import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacalityServices } from './facility.services';

const creatFacility = catchAsync(async (req, res) => {
  const result = await FacalityServices.creatFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const {id} = req.params
  const {...updateData} = req.body
  const result = await FacalityServices.updateFacilityIntoDB(id,updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});
const deleteFacility = catchAsync(async (req, res) => {
  const {id} = req.params
  
  const result = await FacalityServices.deleteFacilityIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated outdoor tennis court with synthetic surface.',
    data: result,
  });
});

export const FacilityControler = {
  creatFacility,
  updateFacility,
  deleteFacility
};
