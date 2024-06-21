import { Types } from 'mongoose';
export type YYYYMMDD = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
export type HHMM = `${number}${number}:${number}${number}`;

export type TBooking = {
    date: YYYYMMDD;
    startTime: HHMM;
    endTime: HHMM;
    user: Types.ObjectId;
    facility: Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
};
export type TimeSlot =  {
    startTime: string;
    endTime: string;
  }
  