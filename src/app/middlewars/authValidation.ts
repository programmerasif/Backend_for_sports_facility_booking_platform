import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import config from '../config';
import { TRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided.');
    }

    const token = authorization.split(' ')[1]; // Bearer token format

    jwt.verify(token, config.JWT_ACCESS_SECRATE as string, (err, decoded) => {
      if (err) {
        return next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token.'));
      }

      const userRole = (decoded as JwtPayload).role;
      
      // Check if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(userRole as TRole)) {
        return next(new AppError(httpStatus.FORBIDDEN, 'You do not have permission to access this route.'));
      }

      // Attach the decoded token to the request object for further use
      req.user = decoded as JwtPayload;
      next(); // Proceed to the next middleware or route handler
    });
  });
};

export default auth;