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
const creatBookings = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await checkAvailabiitySercices.creatBookingsIntoDB(
    req.body,
    user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

export const checkAvailabilityControler = {
  checkAvailability,
  creatBookings,
};
