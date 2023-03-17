// @ts-ignore
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
// @ts-ignore
import { taskMiddleware } from "react-palm/tasks";
// @ts-ignore
import { Provider } from "react-redux";
// @ts-ignore
import KeplerGl from "kepler.gl";

const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

export const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));