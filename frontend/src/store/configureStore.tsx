import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootReducer } from "../reducers";
import { rootEpic } from "../epics";
import { composeWithDevTools } from "redux-devtools-extension";

//enable redux dev tool
const composeEnhancers = composeWithDevTools({});
const epicMiddleware = createEpicMiddleware();
export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
