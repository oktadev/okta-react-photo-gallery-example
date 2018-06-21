import { Moment } from 'moment';
import { IUser } from './user.model';

export interface IAlbum {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
  user?: IUser;
}

export const defaultValue: Readonly<IAlbum> = {};
