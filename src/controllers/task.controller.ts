import { Request, Response } from 'express';
import { AuthRequest } from '../middleware';
import { Task } from '../models/task.model';
import { ITask } from '../types';

export const getAllTasks = async (request: AuthRequest, response: Response) => {
  try {
    const { user } = request;
    const tasks = await Task.find({ user });
    response.json(tasks);
  } catch (error) {
    console.log('error in getAllTasks: ', error);
    response.json({ error: 'Error while fetching tasks' });
    throw error;
  }
};

export const getAllTasksByCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const { id } = request.params;

    const tasks = await Task.find({
      user,
      categoryId: id,
    });
    response.json(tasks);
  } catch (error) {
    console.log('error in getAllTasksByCategory: ', error);
    response.json({ error: 'Error while fetching tasks' });
    throw error;
  }
};

export const getAllCompletedTasks = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;

    const tasks = await Task.find({
      user,
      isCompleted: true,
    });
    response.json(tasks);
  } catch (error) {
    console.log('error in getAllCompletedTasks: ', error);
    response.json({ error: 'Error while fetching tasks' });
    throw error;
  }
};

export const getTasksForToday = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);
    console.log(todaysISODate.toISOString());
    const tasks = await Task.find({
      user,
      date: todaysISODate.toISOString(),
    });
    response.json(tasks);
  } catch (error) {
    console.log('error in getTasksForToday: ', error);
    response.json({ error: 'Error while fetching tasks' });
    throw error;
  }
};

export const createTask = async (request: AuthRequest, response: Response) => {
  try {
    const { user } = request;
    const { name, categoryId, date } = request.body;

    const task = await Task.create({
      name,
      categoryId,
      date,
      user,
    });

    response.json(task);
  } catch (error) {
    console.log('error in createTask: ', error);
    response.json({ error: 'Error while creating task' });
    throw error;
  }
};

export const toggleTaskStatus = async (
  request: Request,
  response: Response
) => {
  try {
    const { isCompleted } = request.body;
    const { id } = request.params;

    const task = await Task.updateOne({ _id: id }, { isCompleted });
    response.send({ message: 'Task status toggled' });
  } catch (error) {
    console.log('error in toggleTaskStatus: ', error);
    response.json({ error: 'Error while toggling task status' });
    throw error;
  }
};

export const deleteTask = async (request: AuthRequest, response: Response) => {
  try {
    const { id } = request.params;
    await Task.findByIdAndDelete(id);
    response.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.log('error in deleteTask', error);
    response.json({ error: 'Error while deleting task' });
    throw error;
  }
};

export const editTask = async (request: Request, response: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = request.body;
    await Task.updateOne({ _id }, { $set: { categoryId, date, name } });
    response.send({ message: 'Task updated' });
  } catch (error) {
    console.log('error in editTask: ', error);
    response.json({ error: 'Error while updating task' });
    throw error;
  }
};
