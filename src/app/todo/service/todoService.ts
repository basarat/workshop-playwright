import axios from 'axios';
import { AddRequest, addEndpoint, AddResponse, GetAllResponse, getAllEndpoint, SetAllRequest, setAllEndpoint, AddMethod, GetAllMethod, SetAllMethod } from '../../../common/types';
import { port } from '../../../common/port';

export const apiRoot = `http://localhost:${port}/todo/api`;

export const add = (body: AddRequest) => {
  return axios
  [AddMethod]<AddResponse>(apiRoot + addEndpoint, body)
    .then(res => res.data);
}

export const getAll = () => {
  return axios
  [GetAllMethod]<GetAllResponse>(apiRoot + getAllEndpoint)
    .then(res => res.data);
}

export const setAll = (body: SetAllRequest) => {
  return axios
  [SetAllMethod]<{}>(apiRoot + setAllEndpoint, body)
    .then(res => res.data);
}
