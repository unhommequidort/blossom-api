import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { User } from '../models/user.model';

export interface AuthRequest extends Request {
  user: string;
}

export const authenticationMiddleware = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorization;
    const { _id } = jwt.verify(token, 'express') as {
      _id: string;
    };

    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      request.user = existingUser.id;
      next();
    }
  } catch (error) {
    console.log('error in authenticationMiddleware', error);
  }
};
