import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { checkAvailabiitySercices } from './bookingModel.service';

const checkAvailability = catchAsync(async (req, res) => {
  let { date } = req.query;
  const result = await checkAvailabiitySercices.checkAvailabilTimeIntoDB(date);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});

export const checkAvailabilityControler = {
  checkAvailability,
};
