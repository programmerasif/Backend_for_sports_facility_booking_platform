import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';

const creatUser = catchAsync(async (req, res) => {
  const result = await userServices.creatUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin registered successfully',
    data: result,
  });
});
const getUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsersIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users successfully',
    data: result,
  });
});

export const usersControler = {
  creatUser,
  createAdmin,
  getUsers
};
