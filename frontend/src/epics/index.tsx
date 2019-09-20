import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";
import * as actions from "../actions";
import { CONFIG } from "../config";
import { GET_TODO_LIST, CREATE_TODO, DELETE_TODO } from "../constants";
import { Todo } from "../types";
import { of } from "rxjs";

// every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
// if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
function getTodoListEpic(action$: any) {
  // action$ is a stream of actions
  // action$.ofType is the outer Observable
  return action$.pipe(
    ofType(GET_TODO_LIST),
    switchMap(
      () => {
        // ajax calls from Observable return observables.
        return ajax
          .getJSON(CONFIG.API_URL + "/todo") // getJSON simply sends a GET request with Content-Type application/json
          .pipe(
            map((data: any) => {
              console.log(data);

              return actions.getTodoListSuccess(data.payload);
            }),
            catchError(error => of(error))
          );
      }
      // get the data and extract only the results
    )
  );
  // at the end our inner Observable has a stream of an array of whisky objects which will be merged into the outer Observable
}

function createTodoEpic(action$: any) {
  return action$.pipe(
    ofType(CREATE_TODO),
    switchMap((action: actions.CreateTodo) => {
      return ajax
        .post(CONFIG.API_URL + "/todo", { payload: action.payload })
        .pipe(
          map((data: any) => {
            return actions.createTodoSuccess(data.payload);
          }),
          catchError(error => of(error))
        );
    })
  );
}

function deleteTodoEpic(action$: any) {
  return action$.pipe(
    ofType(DELETE_TODO),
    switchMap((action: actions.CreateTodo) => {
      return ajax.delete(CONFIG.API_URL + "/todo/" + action.payload).pipe(
        map((data: any) => {
          return actions.deleteTodoSuccess(data.payload);
        }),
        catchError(error => of(error))
      );
    })
  );
}

export const rootEpic = combineEpics(
  getTodoListEpic,
  createTodoEpic,
  deleteTodoEpic
);
