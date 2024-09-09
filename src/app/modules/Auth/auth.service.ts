import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

// Function to generate JWT token
const generateToken = (payload: object, secret: string, expiresIn: string | number) => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error('Error generating token:', error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Error generating token');
  }
};
// const verifyTestToken = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, config.JWT_ACCESS_SECRATE as string);
//     console.log('Decoded Token:', decoded);
//   } catch (error) {
//     console.error('Verification Error:', error);
//   }
// };
const loginUser = async (payLoad: TLoginUser) => {
  const { email, password } = payLoad;
  
  // Checking if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `This user is not found`);
  }

  // Checking if the user is deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `This user is deleted`);
  }

  // Verifying password
  if (user.password !== password) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
  };

  
  const accesToken = generateToken(jwtPayload, config.JWT_ACCESS_SECRATE as string, '1h');

  
  // verifyTestToken(accesToken)
  return {
    accesToken,
    user,
  };
};

export const AuthServices = {
  loginUser,
}