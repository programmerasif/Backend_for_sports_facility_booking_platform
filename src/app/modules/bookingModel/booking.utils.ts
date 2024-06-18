import { Request, Response } from 'express';
import { YYYYMMDD } from './bookingModel.interface';
import { Booking } from './bookingModel.model';


//  Function to generate time slots for a 24-hour day
const generateTimeSlots = (slotDuration: number) => {
  const totalTime = [];
  for (let hour = 0; hour < 24; hour += slotDuration) {
    const startTime = hour.toString().padStart(2, '0') + ':00';
    const endTime = (hour + slotDuration).toString().padStart(2, '0') + ':00';
    totalTime.push({ startTime, endTime });
  }
  return totalTime;
};

export const checkAvailability = async (date:YYYYMMDD) => {
  
   
    // Retrieve bookings for the specified date from the database
    const bookings = await Booking.find({ date, isBooked: 'confirmed' });

    // Define the total available time slots for the day
    const totalSlots = generateTimeSlots(2)

    // Function to check if a time slot is available
    const isSlotAvailable = (slot: { startTime: string; endTime: string }, bookings: any[]) => {
      for (let booking of bookings) {
        if (
          (slot.startTime >= booking.startTime && slot.startTime < booking.endTime) ||
          (slot.endTime > booking.startTime && slot.endTime <= booking.endTime) ||
          (booking.startTime >= slot.startTime && booking.startTime < slot.endTime) ||
          (booking.endTime > slot.startTime && booking.endTime <= slot.endTime)
        ) {
          return false; // Slot is not available
        }
      }
      return true; // Slot is available
    };

    // Find available time slots
    const availableSlots = totalSlots.filter(slot => isSlotAvailable(slot, bookings));
    return availableSlots

}
