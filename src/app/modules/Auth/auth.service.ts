import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken'
import config from '../../config';

const loginUser = async (payLoad: TLoginUser) => {
  const { email, password } = payLoad;
  // here we are chacking the user id from data base
  // checking if the user is exist
  const user = await User.findOne({ email });

  // console.log(await User.isUserExistsByCustomId(payLoad.id));

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `This users is not found`);
  }

  // chacking  if the user is alrady delete or not
  const isDeletedUser = user?.isDeleted;
  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, `This users is Deleted`);
  }
  
  if (user.password !== password) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
  const accesToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRATE as string, {
    expiresIn: "20d",
  });

  return {
      accesToken
  };
};

export const AuthServices = {
  loginUser,
};
