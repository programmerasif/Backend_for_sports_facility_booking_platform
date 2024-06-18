import httpStatus from 'http-status';
import { checkAvailability } from './booking.utils';
import AppError from '../../errors/appError';

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

export const checkAvailabiitySercices = {
  checkAvailabilTimeIntoDB,
};
