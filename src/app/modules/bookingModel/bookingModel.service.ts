/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { checkAvailability, findAvailableSlots } from './booking.utils';
import AppError from '../../errors/appError';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
import { Booking } from './bookingModel.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builders/BuildersQuery';


const getAllBookingsIntoDB = async (query: Record<string, unknown>) => {

  try {
  
    
    const searchableFields = ['name', 'price'];

    // Start with Booking query and add the populate clauses
    const baseQuery = Booking.find().populate('user').populate('facility');

    const productQuery = new QueryBuilder(baseQuery, query)
      .search(searchableFields)
      .filter()
      .paginate()
      .fields();

    // Execute the query after chaining
    const facility = await productQuery.modelQuery.exec();

    // Get pagination information
    const paginationInfo = await productQuery.countTotal();

    return {
      facility,
      hasMore: paginationInfo?.hasMore,
      paginationInfo,
    };
  } catch (error) {
    throw new Error(`Failed to get facilities: ${error.message}`);
  }

};
const checkAvailabilTimeIntoDB = async (payLoad: any) => {
  const facilityId = payLoad?.id
  let date = payLoad?.date;

  if (!date) {
    date = new Date().toISOString().split('T')[0]; 
  }

  const result = await findAvailableSlots(date, 2,facilityId);
  return result;
};

const creatBookingsIntoDB = async (payLoad: any, userData: JwtPayload) => {
  const { facility, date, startTime, endTime} = payLoad;

  // chacking if the time is available or not 
  const isTimeAvailable = await checkAvailability(date, startTime, endTime,facility);

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
