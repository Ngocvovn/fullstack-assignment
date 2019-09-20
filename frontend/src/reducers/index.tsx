import { Actions } from "../actions";

import { combineReducers } from "redux";
import { Todo } from "../types";
import {
  GET_TODO_LIST,
  CREATE_TODO,
  GET_TODO_LIST_SUCCESS,
  CREATE_TODO_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_SUCCESS
} from "../constants";

export interface State {
  todoList: Todo[];
  loading: boolean;
}

export const initialState: State = {
  todoList: [],
  loading: false
};

const todo = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case GET_TODO_LIST:
      return { ...state, loading: true };

    case GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: action.payload
      };

    case CREATE_TODO:
      return { ...state, loading: true };

    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: [...state.todoList, action.payload]
      };

    case DELETE_TODO:
      return { ...state, loading: true };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: action.payload
      };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  todo
});
