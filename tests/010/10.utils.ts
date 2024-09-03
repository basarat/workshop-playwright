import { APIRequestContext } from '@playwright/test';
import { port } from '../../src/common/port';
import {
  SetAllRequest,
  SetAllResponse,
  AddRequest,
  AddResponse,
  GetAllResponse,
  UpdateRequest,
  UpdateResponse,
} from '../../src/common/types';

const api = `http://localhost:${port}/todo/api`;

export async function setAll(request: APIRequestContext, data: SetAllRequest) {
  const response = await request.put(`${api}/set-all`, { data });
  return {
    response,
    json: (await response.json()) as SetAllResponse,
  };
}

export async function getAll(request: APIRequestContext) {
  const response = await request.get(`${api}/get-all`);
  return {
    response,
    json: (await response.json()) as GetAllResponse,
  };
}

export async function add(request: APIRequestContext, data: AddRequest) {
  const response = await request.post(`${api}/add`, { data });
  return {
    response,
    json: (await response.json()) as AddResponse,
  };
}

export async function update(request: APIRequestContext, data: UpdateRequest) {
  const response = await request.post(`${api}/update`, { data });
  return {
    response,
    json: (await response.json()) as UpdateResponse,
  };
}
