import { HHMM, TBooking, TimeSlot, YYYYMMDD } from './bookingModel.interface';
import { Booking } from './bookingModel.model';

//  Function to generate time slots for a 24-hour day
const generateTimeSlots = (slotDuration: number): TimeSlot[] => {
  const totalTimeSlots: TimeSlot[] = [];
  for (let hour = 0; hour < 24; hour += slotDuration) {
    const startTime = hour.toString().padStart(2, '0') + ':00';
    let endTime = (hour + slotDuration).toString().padStart(2, '0') + ':00';

    if (hour + slotDuration > 24) {
      const remainingHour = 24 - hour;
      endTime = (hour + remainingHour).toString().padStart(2, '0') + ':00';
    }

    totalTimeSlots.push({ startTime, endTime });
  }
  return totalTimeSlots;
};

export const checkAvailability = async (
  date: YYYYMMDD,
  startTime: HHMM,
  endTime: HHMM,
) => {

  const bookings = await Booking.find({ date, isBooked: 'confirmed' });

  const isSlotAvailable = (
    startTime: string,
    endTime: string,
    bookings:TBooking[],
  ) => {
    for (const booking of bookings) {
      if (
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (booking.startTime >= startTime && booking.startTime < endTime) ||
        (booking.endTime > startTime && booking.endTime <= endTime)
      ) {
        return false; // Slot is not available
      }
    }
    return true; // Slot is available
  };

  // Check if the requested slot is available
  const slotAvailable = isSlotAvailable(startTime, endTime, bookings);
  return slotAvailable
};

// Function to find available slots
export const findAvailableSlots = async (
  date: string,
  slotDuration: number = 3,
) => {
  const bookings = await Booking.find({ date, isBooked: 'confirmed' });

  // Generate all possible time slots for the day
  const allSlots = generateTimeSlots(slotDuration);

  //   const availableSlots: TimeSlot[] = allSlots.filter(slot => {
  //     let isAvailable = true;

  //     for (const booking of bookings) {
  //       if (
  //         (slot.startTime >= booking.startTime &&
  //           slot.startTime < booking.endTime) ||
  //         (slot.endTime > booking.startTime && slot.endTime <= booking.endTime) ||
  //         (booking.startTime >= slot.startTime &&
  //           booking.startTime < slot.endTime) ||
  //         (booking.endTime > slot.startTime && booking.endTime <= slot.endTime)
  //       ) {
  //         isAvailable = false;
  //         if (parseInt(slot.startTime) === parseInt(booking.startTime)) {
  //           console.log(booking.endTime);
  //           const oddSlot = {
  //             startTime: booking.endTime,
  //             endTime:
  //               (parseInt(booking.endTime) + 1).toString().padStart(2, '0') +
  //               ':00',
  //           };
  //           console.log(oddSlot);
  //         }

  //         break;
  //       }
  //     }

  //     return isAvailable;
  //   });
  //   console.log(availableSlots);

  const availableSlots: TimeSlot[] = [];

  for (const slot of allSlots) {
    let isAvailable = true;

    for (const booking of bookings) {
      if (
        (slot.startTime >= booking.startTime &&
          slot.startTime < booking.endTime) ||
        (slot.endTime > booking.startTime && slot.endTime <= booking.endTime) ||
        (booking.startTime >= slot.startTime &&
          booking.startTime < slot.endTime) ||
        (booking.endTime > slot.startTime && booking.endTime <= slot.endTime)
      ) {
        isAvailable = false;

        if (parseInt(slot.startTime) === parseInt(booking.startTime)) {
          const oddSlot = {
            startTime: booking.endTime,
            endTime:
              (parseInt(booking.endTime) + 1).toString().padStart(2, '0') +
              ':00',
          };
          
          availableSlots.push(oddSlot);
        }

        break;
      }
    }

    if (isAvailable) {
      availableSlots.push(slot);
    }
  }

  availableSlots.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

  return availableSlots;
};
