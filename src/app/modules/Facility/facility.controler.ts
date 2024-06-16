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

export const FacilityControler = {
  creatFacility,
};
