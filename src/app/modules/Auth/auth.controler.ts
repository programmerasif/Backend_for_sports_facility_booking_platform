import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { _id, name, email, role, phone, address } = result.user;
  const sendData = { _id, name, email, role, phone, address };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: result.accesToken,
    data: sendData,
  });
});

export const AuthControler = {
  loginUser,
};
