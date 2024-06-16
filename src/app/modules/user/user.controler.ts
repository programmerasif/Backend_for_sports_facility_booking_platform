import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';

const creatUser = catchAsync(async (req, res) => {
  const { user } = req.body;

  const result = await userServices.creatUserIntoDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const usersControler = {
  creatUser,
};
