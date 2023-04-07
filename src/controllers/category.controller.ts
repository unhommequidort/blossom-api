import { Request, Response } from 'express';
import { Category } from '../models/category.model';
import { ICategory } from '../types';
import { AuthRequest } from '../middleware';

export const getAllCategories = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const categories = await Category.find({ user });
    return response.status(200).json({ categories });
  } catch (error) {
    console.log('error in getAllCategories', error);
    response.json({ error: error.message });
    throw error;
  }
};

export const createCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { name, isEditable, color, icon }: ICategory = request.body;
    const { user } = request;

    const category = await Category.create({
      name,
      isEditable,
      color,
      icon,
      user,
    });

    response.status(201).json({ category });
  } catch (error) {
    console.log('error in createCategory', error);
    response.json({ error: error.message });
    throw error;
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    await Category.findByIdAndDelete(id);
    response.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    console.log('error in deleteCategory', error);
    response.json({ error: error.message });
    throw error;
  }
};

export const updateCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { _id, name, isEditable, color, icon }: ICategory = request.body;

    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          isEditable,
          color,
          icon,
        },
      }
    );

    response.status(200).json({ message: 'Category updated' });
  } catch (error) {
    console.log('error in updateCategory', error);
    response.json({ error: error.message });
    throw error;
  }
};
