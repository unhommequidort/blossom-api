import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, 'express', {
    expiresIn: '7d',
  });
  return authenticatedUserToken;
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log('err in create user', error);
    throw error;
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).json({ message: 'User does not exist' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      const token = getUserToken(existingUser._id);
      return response.status(200).json({
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
        token,
      });
    } else {
      return response.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('error in login user', error);
    throw error;
  }
};
