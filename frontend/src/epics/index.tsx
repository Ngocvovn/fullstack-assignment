import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError } from "rxjs/operators";
import { ofType, combineEpics, ActionsObservable, Epic } from "redux-observable";
import * as actions from "../actions";
import { CONFIG } from "../config";
import { GET_TODO_LIST, CREATE_TODO, DELETE_TODO } from "../constants";
import { of } from "rxjs";
import { Action } from "redux";
import { Todo } from "../types";

// every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
// if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
export const getTodoListEpic: Epic<Action> = (action$) =>
  // action$ is a stream of actions
  action$.pipe(
    ofType(GET_TODO_LIST),
    switchMap(() => {
      // ajax calls from Observable return observables.
      return ajax.get(CONFIG.API_URL + "/todo").pipe(
        map((data: { response: Todo[] }) => {
          return actions.getTodoListSuccess(data.response);
        }),
        catchError(error => of(error))
      );
    })
  );


// ofType causes typing problem, should probably change to import { isOfType } from 'typesafe-actions';
export const createTodoEpic = (action$: any) => {
  return action$.pipe(
    // action$.ofType is the outer Observable
    ofType(CREATE_TODO),
    switchMap((action: actions.CreateTodo) => {
      return ajax
        .post(
          CONFIG.API_URL + "/todo",
          { payload: action.payload },
          { "Content-Type": "application/json" }
        )
        .pipe(
          map((data: { response: Todo }) => {
            return actions.createTodoSuccess(data.response);
          }),
          catchError(error => of(error))
        );
    })
  );
}

const deleteTodoEpic = (action$: any) => {
  return action$.pipe(
    ofType(DELETE_TODO),
    switchMap((action: actions.CreateTodo) => {
      return ajax.delete(CONFIG.API_URL + "/todo/" + action.payload).pipe(
        map(() => {
          return actions.deleteTodoSuccess(action.payload);
        }),
        catchError(error => of(error))
      );
    })
  );
}

export const rootEpic = (actions: ActionsObservable<Action<any>>) =>
  combineEpics(getTodoListEpic, createTodoEpic, deleteTodoEpic)(actions);
