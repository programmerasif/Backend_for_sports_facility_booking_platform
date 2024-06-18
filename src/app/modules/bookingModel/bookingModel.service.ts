import httpStatus from 'http-status';
import { checkAvailability } from './booking.utils';
import AppError from '../../errors/appError';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
import { Booking } from './bookingModel.model';
import { JwtPayload } from 'jsonwebtoken';

const getAllBookingsIntoDB = async () => {
  
const result = await Booking.find().populate('user').populate('facility')
  
  return result
};
const checkAvailabilTimeIntoDB = async (payLoad: any) => {
  let date = payLoad;

  if (!date) {
    date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    console.log(date);
  }

  const isTimeAvailable = await checkAvailability(date);

  if (!isTimeAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Time slot is not avail able');
  }

  return isTimeAvailable;
};
const creatBookingsIntoDB = async (payLoad: any, userData: JwtPayload) => {
  const { facility, date, startTime, endTime } = payLoad;
  // Parse startTime and endTime into Date objects
  // Parse startTime and endTime into Date objects
  const startDateTime = new Date(`2002-01-01T${startTime}:00Z`);
  const endDateTime = new Date(`2002-01-01T${endTime}:00Z`);
  const facilityDetails = await Facility.findById(facility);
  const userObjId = await User.findOne({ email: userData.email });
  const user = userObjId?._id?.toHexString();

  if (!facilityDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found ');
  }

  const durationHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationHours * facilityDetails.pricePerHour;
  console.log(payableAmount);

  const bookingData = {
    facility,
    date,
    startTime,
    endTime,
    user,
    payableAmount,
    isBooked: 'confirmed',
  };

  const result = await Booking.create(bookingData);
  return result;
};

export const checkAvailabiitySercices = {
  checkAvailabilTimeIntoDB,
  creatBookingsIntoDB,
  getAllBookingsIntoDB
};
