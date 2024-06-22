import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { _id, name, email, role, phone, address } = result.user;
  const sendData = { _id, name, email, role, phone, address };
  const token = result.accesToken;

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: token,
    data: sendData,
  });
});

export const AuthControler = {
  loginUser,
};
