/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { checkAvailability, findAvailableSlots } from './booking.utils';
import AppError from '../../errors/appError';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
import { Booking } from './bookingModel.model';
import { JwtPayload } from 'jsonwebtoken';

const getAllBookingsIntoDB = async () => {
  const result = await Booking.find().populate('user').populate('facility');

  return result;
};
const checkAvailabilTimeIntoDB = async (payLoad: any) => {
  let date = payLoad;

  if (!date) {
    date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  const result = await findAvailableSlots(date, 2);
  return result;
};

const creatBookingsIntoDB = async (payLoad: any, userData: JwtPayload) => {
  const { facility, date, startTime, endTime } = payLoad;

  // chacking if the time is available or nopt
  const isTimeAvailable = await checkAvailability(date, startTime, endTime);

  if (!isTimeAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested time is not available');
  }
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
const viewBookingsByUserIntoDB = async (userData: JwtPayload) => {
  const user = await User.findOne({ email: userData.email });
  const _id = user?._id?.toHexString();

  const allBookings = await Booking.find({ user: _id }).populate('facility');
  return allBookings;
};
const cancelBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    { _id: id },
    { isBooked: 'canceled' },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ).populate('facility');
  const resData = {
    _id: result._id,
    facility: result.facility,
    date: result.date,
    startTime: result.startTime,
    endTime: result.endTime,
    user: result.user,
    payableAmount: result.payableAmount,
    isBooked: result.isBooked,
  };
  return resData;
};
export const checkAvailabiitySercices = {
  checkAvailabilTimeIntoDB,
  creatBookingsIntoDB,
  getAllBookingsIntoDB,
  viewBookingsByUserIntoDB,
  cancelBookingIntoDB,
};
