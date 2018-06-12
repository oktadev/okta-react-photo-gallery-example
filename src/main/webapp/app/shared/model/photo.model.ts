import { Moment } from 'moment';
import { IAlbum } from './album.model';
import { ITag } from './tag.model';

export interface IPhoto {
  id?: number;
  title?: string;
  description?: any;
  imageContentType?: string;
  image?: any;
  takenOn?: Moment;
  uploadedOn?: Moment;
  album?: IAlbum;
  tags?: ITag[];
}

export const defaultValue: Readonly<IPhoto> = {};
