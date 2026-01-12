import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accept from '@theme/ApiExplorer/Accept/slice';
import auth from '@theme/ApiExplorer/Authorization/slice';
import body from '@theme/ApiExplorer/Body/slice';
import contentType from '@theme/ApiExplorer/ContentType/slice';
import params from '@theme/ApiExplorer/ParamOptions/slice';
import response from '@theme/ApiExplorer/Response/slice';
import server from '@theme/ApiExplorer/Server/slice';

const rootReducer = combineReducers({
  accept,
  contentType,
  response,
  server,
  body,
  params,
  auth,
});

export function createStoreWithState(preloadedState, middlewares) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
  });
}

export function createStoreWithoutState(preloadedState, middlewares) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
  });
}
