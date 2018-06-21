import { isEqual } from 'lodash';
import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITag, defaultValue } from 'app/shared/model/tag.model';

export const ACTION_TYPES = {
  FETCH_TAG_LIST: 'tag/FETCH_TAG_LIST',
  FETCH_TAG: 'tag/FETCH_TAG',
  CREATE_TAG: 'tag/CREATE_TAG',
  UPDATE_TAG: 'tag/UPDATE_TAG',
  DELETE_TAG: 'tag/DELETE_TAG',
  RESET: 'tag/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITag>,
  entity: defaultValue,
  links: {
    last: 0
  },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TagState = Readonly<typeof initialState>;

// Reducer

export default (state: TagState = initialState, action): TagState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TAG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TAG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TAG):
    case REQUEST(ACTION_TYPES.UPDATE_TAG):
    case REQUEST(ACTION_TYPES.DELETE_TAG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TAG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TAG):
    case FAILURE(ACTION_TYPES.CREATE_TAG):
    case FAILURE(ACTION_TYPES.UPDATE_TAG):
    case FAILURE(ACTION_TYPES.DELETE_TAG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAG_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links: { last: links.last },
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TAG):
    case SUCCESS(ACTION_TYPES.UPDATE_TAG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TAG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/tags';

// Actions

export const getEntities: ICrudGetAllAction<ITag> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TAG_LIST,
    payload: axios.get<ITag>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITag> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TAG,
    payload: axios.get<ITag>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITag> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TAG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITag> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TAG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITag> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TAG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
