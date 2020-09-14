import { ActionsObservable } from "redux-observable";
import { getTodoListEpic, createTodoEpic, deleteTodoEpic } from "../epics";
import {
  GET_TODO_LIST,
  GET_TODO_LIST_SUCCESS,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_SUCCESS
} from "../constants";
import { of } from "rxjs";

const ajax = {
  get: () => of({ response: [{ id: "1", payload: "hello" }] }),
  post: () => of({ response: { id: "2", payload: "hi" } }),
  delete: () => of({})
};

describe("getTodoList action", () => {
  it("dispatches the correct actions when it is successful", done => {
    const action$ = ActionsObservable.of({
      type: GET_TODO_LIST
    });
    const expectedOutputActions = {
      type: GET_TODO_LIST_SUCCESS,
      payload: [{ id: "1", payload: "hello" }]
    };

    getTodoListEpic(action$, ajax).subscribe((actualOutputActions: any) => {
      expect(actualOutputActions).toEqual(expectedOutputActions);
      done();
    });
  });
});

describe("createTodo action", () => {
  it("dispatches the correct actions when it is successful", done => {
    const action$ = ActionsObservable.of({
      type: CREATE_TODO
    });
    const expectedOutputActions = {
      type: CREATE_TODO_SUCCESS,
      payload: { id: "2", payload: "hi" }
    };

    createTodoEpic(action$, ajax).subscribe((actualOutputActions: any) => {
      expect(actualOutputActions).toEqual(expectedOutputActions);
      done();
    });
  });
});

describe("deleteTodo action", () => {
  it("dispatches the correct actions when it is successful", done => {
    const action$ = ActionsObservable.of({
      type: DELETE_TODO
    });
    const expectedOutputActions = {
      type: DELETE_TODO_SUCCESS
    };

    deleteTodoEpic(action$, ajax).subscribe((actualOutputActions: any) => {
      expect(actualOutputActions).toEqual(expectedOutputActions);
      done();
    });
  });
});
