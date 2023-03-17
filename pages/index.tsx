import React from "react";
// @ts-ignore
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
// @ts-ignore
import { taskMiddleware } from "react-palm/tasks";
import { Provider } from "react-redux";
// @ts-ignore
import KeplerGl from "kepler.gl";


const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));
// @ts-ignore
const KeplerContext: any = React.createContext(null);
export default function App() {
  return (
      <KeplerContext.Provider value={ store }>
        <KeplerContext.Consumer>
          { 
            (store: any) => (
              <KeplerGl
                id="map"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                width={ '600px' }
                height={ '600px' }
                store={ store }
              />
            )
          }
        </KeplerContext.Consumer>
      </KeplerContext.Provider>
  );
}

// JSX Styles
const containerStyles = {
  display: 'flex',
  width: '100%',
  minHeight: '100vh'
}
