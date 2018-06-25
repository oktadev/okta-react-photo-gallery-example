import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IAlbum, defaultValue } from 'app/shared/model/album.model';

export const ACTION_TYPES = {
  FETCH_ALBUM_LIST: 'album/FETCH_ALBUM_LIST',
  FETCH_ALBUM: 'album/FETCH_ALBUM',
  CREATE_ALBUM: 'album/CREATE_ALBUM',
  UPDATE_ALBUM: 'album/UPDATE_ALBUM',
  DELETE_ALBUM: 'album/DELETE_ALBUM',
  SET_BLOB: 'album/SET_BLOB',
  RESET: 'album/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAlbum>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AlbumState = Readonly<typeof initialState>;

// Reducer

export default (state: AlbumState = initialState, action): AlbumState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ALBUM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALBUM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ALBUM):
    case REQUEST(ACTION_TYPES.UPDATE_ALBUM):
    case REQUEST(ACTION_TYPES.DELETE_ALBUM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ALBUM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALBUM):
    case FAILURE(ACTION_TYPES.CREATE_ALBUM):
    case FAILURE(ACTION_TYPES.UPDATE_ALBUM):
    case FAILURE(ACTION_TYPES.DELETE_ALBUM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALBUM_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALBUM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ALBUM):
    case SUCCESS(ACTION_TYPES.UPDATE_ALBUM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ALBUM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/albums';

// Actions

export const getEntities: ICrudGetAllAction<IAlbum> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ALBUM_LIST,
    payload: axios.get<IAlbum>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAlbum> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ALBUM,
    payload: axios.get<IAlbum>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAlbum> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ALBUM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAlbum> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ALBUM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAlbum> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ALBUM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
