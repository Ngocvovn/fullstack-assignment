import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";
import * as actions from "../actions";
import { CONFIG } from "../config";
import { GET_TODO_LIST, CREATE_TODO, DELETE_TODO } from "../constants";
import { of } from "rxjs";

// every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
// if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
export function getTodoListEpic(action$: any, ajax: any) {
  // action$ is a stream of actions
  // action$.ofType is the outer Observable
  return action$.pipe(
    ofType(GET_TODO_LIST),
    switchMap(() => {
      // ajax calls from Observable return observables.
      return ajax.get(CONFIG.API_URL + "/todo").pipe(
        map((data: any) => {
          return actions.getTodoListSuccess(data.response);
        }),
        catchError(error => of(error))
      );
    })
  );
}

export function createTodoEpic(action$: any, ajax: any) {
  return action$.pipe(
    ofType(CREATE_TODO),
    switchMap((action: actions.CreateTodo) => {
      return ajax
        .post(
          CONFIG.API_URL + "/todo",
          { payload: action.payload },
          { "Content-Type": "application/json" }
        )
        .pipe(
          map((data: any) => {
            return actions.createTodoSuccess(data.response);
          }),
          catchError(error => of(error))
        );
    })
  );
}

export function deleteTodoEpic(action$: any, ajax: any) {
  return action$.pipe(
    ofType(DELETE_TODO),
    switchMap((action: actions.CreateTodo) => {
      return ajax.delete(CONFIG.API_URL + "/todo/" + action.payload).pipe(
        map((data: any) => {
          return actions.deleteTodoSuccess(action.payload);
        }),
        catchError(error => of(error))
      );
    })
  );
}

export const rootEpic = (actions: any) =>
  combineEpics(getTodoListEpic, createTodoEpic, deleteTodoEpic)(actions, ajax);
