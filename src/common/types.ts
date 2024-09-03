export type TodoItem = {
  id: string;
  completed: boolean;
  message: string;
};

export const addEndpoint = "/add";
export type AddRequest = {
  message: string;
};
export type AddResponse = {
  id: string;
};
export const AddMethod = "post";

export const getAllEndpoint = "/get-all";
export type GetAllResponse = {
  items: TodoItem[];
};
export const GetAllMethod = "get";

export const setAllEndpoint = "/set-all";
export type SetAllRequest = {
  items: TodoItem[];
};
export const SetAllMethod = "put";
export type SetAllResponse = {
  status: "success";
};

export const updateEndpoint = '/update';
export type UpdateRequest = TodoItem;
export type UpdateResponse = {
  status: 'success',
  item: TodoItem,
} | {
  status: 'error',
  reason: 'Item not found'
};
export const UpdateMethod = 'post';
