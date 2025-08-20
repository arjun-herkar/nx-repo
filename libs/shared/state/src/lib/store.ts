import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authReducer } from './auth/auth.slice';
import { watchAuth } from './auth/auth.saga';

const rootReducer = combineReducers({
  auth: authReducer,
  // ... other reducers
});

function* rootSaga() {
  yield all([watchAuth()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
