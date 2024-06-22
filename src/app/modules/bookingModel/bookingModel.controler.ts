import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { checkAvailabiitySercices } from './bookingModel.service';

const getAllBookings = catchAsync(async (req, res) => {
  const result = await checkAvailabiitySercices.getAllBookingsIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  const { date } = req.query;
  const result = await checkAvailabiitySercices.checkAvailabilTimeIntoDB(date);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});
const viewBookingsByUser = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await checkAvailabiitySercices.viewBookingsByUserIntoDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const creatBookings = catchAsync(async (req, res) => {
  const userdata = req.user;

  const result = await checkAvailabiitySercices.creatBookingsIntoDB(
    req.body,
    userdata,
  );
  const {_id,facility,date,startTime,endTime,user,payableAmount,isBooked} = result
  const sendData = {_id,facility,date,startTime,endTime,user,payableAmount,isBooked}
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: sendData,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await checkAvailabiitySercices.cancelBookingIntoDB(id);
const {_id,facility,date,startTime,endTime,user,payableAmount,isBooked} = result
  const sendData = {_id,facility,date,startTime,endTime,user,payableAmount,isBooked}
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: sendData,
  });
});
export const checkAvailabilityControler = {
  checkAvailability,
  creatBookings,
  getAllBookings,
  viewBookingsByUser,
  cancelBooking
};
