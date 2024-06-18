// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import sendResponse from '../../utils/sendResponse';
// import { ChackAvailityRoutes } from './checkAvailability.rout';
// import { checkAvailabiitySercices } from './checkAvailability.service';

// const checkAvailability = catchAsync(async (req, res) => {
//   let { date } = req.query;

//   // Create the payload object as needed
//   const payLoad = { date };
  

//   const checkAvailabilTime = await checkAvailabiitySercices.checkAvailabilTimeIntoDB(payLoad);
    
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User registered successfully',
//         data: null,
//       });
// });

// export const checkAvailabilityControler = {
//   checkAvailability,
// };
