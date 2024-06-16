import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';

const auth = (...requerdRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const authorization = req.headers.authorization
   const token = authorization;

   if (!token ) {
    throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
   }

jwt.verify(token,config.JWT_ACCESS_SECRATE as string, function(err, decoded) {
    if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
    }

    const role = (decoded as JwtPayload).role
   if (requerdRoles && !requerdRoles.includes(role)) {
    throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
   }
    req.user = decoded as JwtPayload
  });
   next()
  })
};
export default auth;
