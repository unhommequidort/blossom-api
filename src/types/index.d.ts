export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface IColor {
  id: string;
  name: string;
  code: string;
}

export interface IIcon {
  id: string;
  name: string;
  symbol: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  user: IUser | string;
  isEditable?: boolean;
  color: IColor;
  icon: IIcon;
}

export interface ITask {
  _id?: string;
  name: string;
  user: IUser | string;
  categoryId: ICategory | string;
  isCompleted: boolean;
  isEditable: boolean;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}
