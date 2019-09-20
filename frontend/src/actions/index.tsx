import * as constants from "../constants";
import { Todo } from "../types";

export interface GetTodoList {
  type: constants.GET_TODO_LIST;
}

export interface GetTodoListSuccess {
  type: constants.GET_TODO_LIST_SUCCESS;
  payload: Todo[];
}

export function getTodoList(): GetTodoList {
  return {
    type: constants.GET_TODO_LIST
  };
}

export function getTodoListSuccess(todoList: Todo[]): GetTodoListSuccess {
  return {
    type: constants.GET_TODO_LIST_SUCCESS,
    payload: todoList
  };
}

export interface GetTodo {
  type: constants.GET_TODO;
  payload: string;
}

export interface GetTodoSuccess {
  type: constants.GET_TODO_SUCCESS;
  payload: Todo;
}

export function getTodo(id: string): GetTodo {
  return {
    type: constants.GET_TODO,
    payload: id
  };
}

export function getTodoSuccess(todo: Todo): GetTodoSuccess {
  return {
    type: constants.GET_TODO_SUCCESS,
    payload: todo
  };
}

export interface DeleteTodo {
  type: constants.DELETE_TODO;
  payload: string;
}

export interface DeleteTodoSuccess {
  type: constants.DELETE_TODO_SUCCESS;
  payload: string;
}

export function deleteTodo(id: string): DeleteTodo {
  return {
    type: constants.DELETE_TODO,
    payload: id
  };
}

export function deleteTodoSuccess(id: string): DeleteTodoSuccess {
  return {
    type: constants.DELETE_TODO_SUCCESS,
    payload: id
  };
}

export interface CreateTodo {
  type: constants.CREATE_TODO;
  payload: string;
}

export interface CreateTodoSuccess {
  type: constants.CREATE_TODO_SUCCESS;
  payload: Todo;
}

export function createTodo(payload: string): CreateTodo {
  return {
    type: constants.CREATE_TODO,
    payload
  };
}

export function createTodoSuccess(todo: Todo): CreateTodoSuccess {
  return {
    type: constants.CREATE_TODO_SUCCESS,
    payload: todo
  };
}

export type Actions =
  | CreateTodo
  | CreateTodoSuccess
  | DeleteTodo
  | DeleteTodoSuccess
  | GetTodo
  | GetTodoSuccess
  | GetTodoList
  | GetTodoListSuccess;
