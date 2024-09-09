import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import config from '../config';
import { TRole } from '../modules/user/user.interface';

const auth = (...requerdRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route 1');
    }

    jwt.verify(
      token,
      config.JWT_ACCESS_SECRATE as string,
      function (err, decoded) {
        // if (err) {
        //   console.log(err);
          
        //   throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route 2');
        // }

          const role = (decoded as JwtPayload).role
         if (requerdRoles && !requerdRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED,'You have no access to this route 3')
         }
        req.user = decoded as JwtPayload;
      },
    );
    next();
  });
};
export default auth;
