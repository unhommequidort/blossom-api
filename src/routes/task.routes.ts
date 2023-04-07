import express, { Request, Response } from 'express';
import { authenticationMiddleware } from '../middleware';
import {
  getAllTasks,
  createTask,
  toggleTaskStatus,
  getAllTasksByCategory,
  deleteTask,
  getAllCompletedTasks,
  getTasksForToday,
  editTask,
} from '../controllers/task.controller';

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route('/').get(getAllTasks);
taskRoutes.route('/category/:id').get(getAllTasksByCategory);
taskRoutes.route('/completed').get(getAllCompletedTasks);
taskRoutes.route('/today').get(getTasksForToday);
taskRoutes.route('/create').post(createTask);
taskRoutes.route('/:id').delete(deleteTask);
taskRoutes.route('/toggle/:id').put(toggleTaskStatus);
taskRoutes.route('/edit').put(editTask);

export default taskRoutes;
